const fs = require('fs');
const utils = require('./utils')

module.exports = (api, options) => {
  const { createServicesFolder } = utils(api);

  const storePlainFile = api.resolve('./src/store.js');
  const storeFolder = api.resolve('./src/store/');

  api.extendPackage({
    dependencies: {
      '@feathersjs/authentication-client': '^4.3.5',
      '@feathersjs/feathers': '^4.3.5',
      '@feathersjs/socketio-client': '^4.3.5',
      'feathers-vuex': '^3.2.1',
      'socket.io-client': '^2.3.0',
    },
  });

  const moveStorePlainToFolderIndex = () => {
    const storeIndexFile = api.resolve('./src/store/index.js');

    try {
      if (fs.existsSync(storePlainFile) && !fs.existsSync(storeIndexFile)) {
        if (!fs.existsSync(storeFolder)) fs.mkdirSync(storeFolder);

        fs.rename(storePlainFile, storeIndexFile, (err) => {
          if (err) throw err;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  function createFeathersClientFile() {
    const clientFilePath = './src/store/feathers/client.js';
    const file = api.resolve(clientFilePath);
    if (!fs.existsSync(file)) {
      api.render({
        clientFilePath: './templates/store/feathers/client.js',
      }, {
        serverUrl: options.init.serverUrl,
      });
    }
  }

  function insertStoreImports(storeLines) {
    if (storeLines.findIndex(line => line.includes('feathers-vuex')) >= 0) { return storeLines; }

    const imports = () => {
      let clientLine = '';
      if (options.init.isAuth) {
        const authIdField = options.init.authIdField || 'id';
        clientLine = `const { auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '${authIdField}' });`;
      } else {
        clientLine = 'const { auth, FeathersVuex } = feathersVuex(feathersClient)';
      }

      return ['',
        "import feathersVuex from 'feathers-vuex';",
        "import feathersClient from './feathers-client';",
        clientLine,
        'Vue.use(FeathersVuex);',
        "const requireModule = require.context('./services', false, /.js$/);",
        'const servicePlugins = requireModule.keys().map(modulePath => requireModule(modulePath).default);',
      ];
    };

    // inject import
    const vueUseVuexLine = storeLines.findIndex(line => line.includes('Vue.use(Vuex)'));
    storeLines.splice(vueUseVuexLine + 1, 0, ...imports());

    return storeLines;
  }

  function insertStorePlugins(storeLines) {
    function indexPluginsArray() {
      return storeLines.findIndex(line => line.includes('plugins: ['));
    }

    const indexServicePlugins = storeLines.findIndex(line => line.includes('...servicePlugins,'));
    const indexAuthPlugin = storeLines.findIndex(line => line.includes("auth({ userService: 'users' })"));

    if (indexPluginsArray() < 0) {
      const indexExportVuex = storeLines.findIndex(line => line.includes('export default new Vuex.Store({'));
      if (indexExportVuex < 0) throw new Error('No export default new Vuex.Store - Line!');
      storeLines.splice(indexExportVuex + 1, 0, '  plugins: [', '  ],');
    }

    if (indexServicePlugins < 0) {
      storeLines.splice(indexPluginsArray() + 1, 0, '    ...servicePlugins,');
    }

    if (indexAuthPlugin < 0 && options.init.isAuth) {
      const userService = options.init.authUserService || 'users';
      storeLines.splice(indexPluginsArray() + 1, 0, `    auth({ userService: '${userService}' }),`);
    }

    return storeLines;
  }

  function modifyStoreFile() {
    const storeFile = api.resolve('./src/store/index.js');
    const store = fs.readFileSync(storeFile, { encoding: 'utf-8' });
    let storeLines = store.split(/\r?\n/g);

    storeLines = insertStoreImports(storeLines);
    storeLines = insertStorePlugins(storeLines);

    fs.writeFileSync(storeFile, storeLines.join('\n'), { encoding: 'utf-8' });
  }

  moveStorePlainToFolderIndex();
  createFeathersClientFile();
  modifyStoreFile();
  createServicesFolder();
};
