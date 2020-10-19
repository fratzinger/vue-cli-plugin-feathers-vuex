const fs = require('fs');
const { checkVuex } = require('../utils');

const injectLinesBeforeVueUseVuex = (api, lines = [], unless) => {
  checkVuex(api);

  const storeFile = api.resolve('./src/store/index.js');
  const store = fs.readFileSync(storeFile, { encoding: 'utf-8' });
  let storeLines = store.split(/\r?\n/g);

  if (unless(storeLines)) { return; }

  const vueUseVuexLineIndex = storeLines.findIndex(line => line.includes('Vue.use(Vuex)'));
  storeLines.splice(vueUseVuexLineIndex + 1, 0, lines);

  fs.writeFileSync(storeFile, storeLines.join('\n'), { encoding: 'utf-8' });
};

const injectPlugins = (api, plugins = []) => {
  const storeFile = api.resolve('./src/store/index.js');
  const store = fs.readFileSync(storeFile, { encoding: 'utf-8' });
  let storeLines = store.split(/\r?\n/g);

  const indexPluginsStarting = () => storeLines.findIndex(line => line.replace(/\s/g,'').includes('plugins: ['.trim()));
  const indexPluginsEmpty = () => storeLines.findIndex(line => line.replace(/\s/g,'').includes('plugins: []'.trim()));
  const indexPluginsEnding = () => storeLines.findIndex((line, i) => i > indexPluginsStarting() && line.replace(/\s/g,'') === '],');

  if (indexPluginsStarting() < 0) {
    const indexExportVuex = storeLines.findIndex(line => line.includes('export default new Vuex.Store({'));
    if (indexExportVuex < 0) {
      console.error('Cannot add feathers-vuex plugins to vuex-file. You have to do that manually: https://feathers-vuex.netlify.app/getting-started.html#vuex-store');
    }
    storeLines.splice(indexExportVuex + 1, 0, '  plugins: [', '  ],');
  } else if (indexPluginsEmpty() < 0) {
    storeLines.splice(indexPluginsEmpty(), 1, '  plugins: [', '  ],');
  }
  
  plugins.forEach(plugin => {
    const pluginExists = storeLines.findIndex((line, i) => i > indexPluginsStarting() && i < indexPluginsEnding() && line.trim().includes(plugin.trim()));
    if (pluginExists) { return; }
    storeLines.splice(indexPluginsEnding(), 0, `  ${plugin}`);
  });

  fs.writeFileSync(storeFile, storeLines.join('\n'), { encoding: 'utf-8' });
};

const moveStorePlainToFolderIndex = (api) => {
  const storeFolder = api.resolve('./src/store/');
  const storePlainFile = api.resolve('./src/store.js');
  const storeIndexFile = api.resolve('./src/store/index.js');

  if (fs.existsSync(storePlainFile) && !fs.existsSync(storeIndexFile)) {
    // if `src/store.js` exists, move it to seperate folder
    if (!fs.existsSync(storeFolder)) fs.mkdirSync(storeFolder);

    fs.rename(storePlainFile, storeIndexFile, (err) => {
      if (err) throw err;
    });
  }
};

module.exports = {
  moveStorePlainToFolderIndex,
  injectLinesBeforeVueUseVuex,
  injectPlugins
};
