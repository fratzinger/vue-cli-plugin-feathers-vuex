const fs = require('fs');
const path = require('path');
const {
  feathersClientFile,
  feathersAuthFile,
  createFeathersFolder
} = require('../utils');

module.exports.createFeathersClientFile = (api, options) => {
  createFeathersFolder(api);
  const clientFile = api.resolve(feathersClientFile);
  if (fs.existsSync(clientFile)) {
    console.error(`feathers client file already exists at: '${clientFile}'. It won't be overwritten.`);
    return;
  }
  
  api.render({
    [feathersClientFile]: path.resolve(__dirname, '../templates/app/feathers.client.ejs'),
  }, options);
};

module.exports.createFeathersAuthFile = (api, options) => {
  createFeathersFolder(api);
  const authFilePath = api.resolve(feathersAuthFile);
  if (fs.existsSync(authFilePath)) {
    console.error(`feathers auth file already exists at: '${authFilePath}'. It won't be overwritten.`);
    return;
  }
  
  api.render({
    [feathersAuthFile]: '../templates/app/feathers.auth.ejs'
  }, options);
};
