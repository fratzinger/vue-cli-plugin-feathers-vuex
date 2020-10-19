const createApp = require('./app');
const createService = require('./service');
const {
  checkVuex
} = require('./utils');

module.exports = (api, options) => {
  checkVuex(api);

  if (!options.actionType || options.actionType === 'app') {
    createApp(api, options);
  } else if (options.actionType === 'service') {
    createService(api, options.service);
  }
};
