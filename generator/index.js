const createApp = require('./app');
const createService = require('./service');
const copyTemplate = require('./copy-template');
const createServiceFromTemplate = require('./serviceFromTemplate');

const {
  checkVuex
} = require('./utils');

module.exports = (api, options) => {
  checkVuex(api);

  if (!options.actionType || options.actionType === 'app') {
    createApp(api, options);
  } else if (options.actionType === 'service') {
    createService(api, options.service);
  } else if (options.actionType === 'copyTemplate') {
    copyTemplate(api, options.copyTemplate);
  } else if (options.actionType === 'serviceFromTemplate') {
    createServiceFromTemplate(api, {
      ...options.service,
      ...options.serviceFromTemplate
    });
  }
};
