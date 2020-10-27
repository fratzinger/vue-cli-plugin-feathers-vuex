const { 
  createServicesFolder,
  createModelsFolder,
  createFeathersFolder,
  checkVuex
} = require('../utils');

const {
  moveStorePlainToFolderIndex,
  injectLinesBeforeVueUseVuex,
  injectPlugins
} = require('./storeFile.utils');

const { 
  createFeathersClientFile,
  createFeathersAuthFile
} = require('./app.utils');

const makeService = require('../service');

const dependencies = {
  '@feathersjs/authentication-client': '^4.5.9',
  '@feathersjs/feathers': '^4.5.9',
  '@feathersjs/socketio-client': '^4.5.9',
  'feathers-vuex': '^3.13.0',
  'socket.io-client': '^2.3.1',
};

module.exports = async (api, {
  app: appOptions,
  service: usersServiceOptions
}) => {
  checkVuex(api);

  api.extendPackage({
    dependencies
  });

  await moveStorePlainToFolderIndex(api);
  createFeathersFolder(api);
  createFeathersClientFile(api, appOptions);

  createServicesFolder(api);
  createModelsFolder(api);

  if (appOptions.isAuth) {
    createFeathersAuthFile(api, {
      ...appOptions,
      servicePath: usersServiceOptions.servicePath
    });
    makeService(api, usersServiceOptions);
  }

  const linesAtTop = [
    '',
    'import { FeathersVuex } from \'feathers-vuex\';',
    'Vue.use(FeathersVuex);',
    '',
    'const req = require.context(\'@/store/feathers/services\', true, /service.js$/);',
    'const servicePlugins = req.keys().map((path) => req(path).default);',
  ];

  if (appOptions.isAuth) {
    linesAtTop.push('import auth from \'@/store/feathers/feathers.auth\';');
  }

  await injectLinesBeforeVueUseVuex(api, linesAtTop, (storeLines) => {
    return storeLines.findIndex(line => line.includes('Vue.use(FeathersVuex)')) >= 0;
  });

  const plugins = ['...servicePlugins'];
  if (appOptions.isAuth) plugins.push('auth');

  await injectPlugins(api, plugins);
};
