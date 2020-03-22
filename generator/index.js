const init = require("./init.js");
const createService = require("./createService");

module.exports = (api, options) => {
  const hasVuex = api.hasPlugin('vuex');
  if (!hasVuex) {
    throw "Vuex not installed! Please run 'vue add vuex' first!";
  }

  const isInit = options.actionType == 'init';

  if (isInit) init(api, options);

  const isService = options.actionType == 'service';

  if (isService) createService(api, options);
};
