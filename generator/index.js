module.exports = (api, options) => {
  const hasVuex = api.hasPlugin('vuex');
  if (!hasVuex) {
    throw "Vuex not installed! Please run 'vue add vuex' first!";
  }

  const isInit = options.actionType == "init";

  if (isInit) require("./init.js")(api, options);

  const isService = options.actionType == "service";

  if (isService) require("./createService.js")(api, options);
};