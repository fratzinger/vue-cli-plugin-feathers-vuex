const fs = require('fs');
const path = require("path");
const { feathersPath } = require("../helper");

module.exports = (api) => {
  const createServicesFolder = () => {
    try {
      const servicesFolder = api.resolve(path.join(feathersPath, "services"));
      if (!fs.existsSync(servicesFolder)) fs.mkdirSync(servicesFolder);
    } catch (ex) {
      //console.log(ex);
    }
  };

  return {
    createServicesFolder,
  };
};
