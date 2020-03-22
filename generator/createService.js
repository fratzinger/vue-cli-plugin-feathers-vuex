const fs = require('fs');
const utils = require("./utils");

module.exports = (api, options) => {
  const { createServicesFolder } = utils(api);

  if (options.actionType !== 'service') throw 'service not defined!';

  const clientPath = options.service.feathersClientPath || '@/store/feathers-client.js';
  const globalClientPath = api.resolve(clientPath);
  if (fs.existsSync(globalClientPath)) {
    throw `feathers-client file at ${globalClientPath} !`;
  }

  createServicesFolder();

  const servicePath = options.service.path;
  const { idField, instanceDefaults } = options.service;
  const customizeStore = options.service.isCustomize && options.service.customize.includes('store');

  api.render({
    [`./src/store/services/${servicePath}.js`]: './templates/store/services/service.js',
  }, {
    clientPath,
    idField,
    servicePath,
    instanceDefaults,
    customizeStore,
  });
};
