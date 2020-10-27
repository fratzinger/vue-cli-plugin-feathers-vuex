const fs = require('fs');
const fsp = fs.promises;
const { checkVuex } = require('../utils');

const injectLinesBeforeVueUseVuex = async (api, lines = [], unless) => {
  checkVuex(api);

  const storeFile = api.resolve('./src/store/index.js');
  const store = await fsp.readFile(storeFile, { encoding: 'utf-8' });
  let storeLines = store.split(/\r?\n/g);

  if (unless(storeLines)) { return; }

  const vueUseVuexLineIndex = storeLines.findIndex(line => line.includes('Vue.use(Vuex)'));
  storeLines.splice(vueUseVuexLineIndex + 1, 0, ...lines);

  await fsp.writeFile(storeFile, storeLines.join('\n'));
};

const injectPlugins = async (api, plugins = []) => {
  const storeFile = api.resolve('./src/store/index.js');
  const store = await fsp.readFile(storeFile, { encoding: 'utf-8' });
  let storeLines = store.split(/\r?\n/g);

  const indexPluginsStarting = () => storeLines.findIndex(line => line.replace(/\s/g,'').includes('plugins:['));
  const indexPluginsEmpty = () => storeLines.findIndex(line => line.replace(/\s/g,'').includes('plugins:[]'));
  const indexPluginsEnding = () => storeLines.findIndex((line, i) => i > indexPluginsStarting() && line.replace(/\s/g,'') === '],');

  if (indexPluginsStarting() < 0) {
    // insert plugins lines after 'new Vuex.Store({'
    const indexExportVuex = storeLines.findIndex(line => line.includes('export default new Vuex.Store({'));
    if (indexExportVuex < 0) {
      console.error('Cannot add feathers-vuex plugins to vuex-file. You have to do that manually: https://feathers-vuex.netlify.app/getting-started.html#vuex-store');
      return;
    }
    storeLines.splice(indexExportVuex + 1, 0, '  plugins: [', '  ],');
  } else if (indexPluginsEmpty() > 0) {
    // replace 'plugins: []' line with multiple lines
    storeLines.splice(indexPluginsEmpty(), 1, '  plugins: [', '  ],');
  }
  
  plugins.forEach((plugin, i) => {
    let pluginLine = storeLines.findIndex((line, j) => j > indexPluginsStarting() && j < indexPluginsEnding() && line.trim().includes(plugin.trim()));
    if (pluginLine > 0) {
      console.error('plugin exists');
      return; 
    }
    pluginLine = `    ${plugin}`;
    if (i < plugins.length - 1) { pluginLine += ','; }
    storeLines.splice(indexPluginsEnding(), 0, pluginLine);
  });

  await fsp.writeFile(storeFile, storeLines.join('\n'));
};

const moveStorePlainToFolderIndex = async (api) => {
  const storeFolder = api.resolve('./src/store/');
  const storePlainFile = api.resolve('./src/store.js');
  const storeIndexFile = api.resolve('./src/store/index.js');

  if (fs.existsSync(storePlainFile) && !fs.existsSync(storeIndexFile)) {
    // if `src/store.js` exists, move it to seperate folder
    if (!fs.existsSync(storeFolder)) await fsp.mkdir(storeFolder);

    await fsp.rename(storePlainFile, storeIndexFile);
  }
};

module.exports = {
  moveStorePlainToFolderIndex,
  injectLinesBeforeVueUseVuex,
  injectPlugins
};
