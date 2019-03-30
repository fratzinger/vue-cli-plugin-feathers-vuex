const fs = require('fs');

module.exports = (api) => {
  const createServicesFolder = () => {
    try {
      const servicesFolder = api.resolve('./src/store/services/');
      if (!fs.existsSync(servicesFolder)) fs.mkdirSync(servicesFolder);
    } catch (ex) {
      console.log(ex);
    }
  };

  return {
    createServicesFolder,
  };
};
