const fs = require('fs');

module.exports = (api, options) => {
  const { createServicesFolder } = require('./utils')(api);

  if (options.actionType !== 'service') throw 'service not defined!';

  const feathersClientPath = options.service.feathersClientPath || '@/store/feathers-client.js';
  const globalClientPath = api.resolve(feathersClientPath);
  if (fs.existsSync(globalClientPath)) {
    throw `feathers-client file at ${globalClientPath} !`;
  }

  createServicesFolder();

  const file = require.resolve('./templates/service.js');

  let service = fs.readFileSync(file, { encoding: 'utf-8' });

  const servicePath = options.service.path;
  const serviceIdField = options.service.idField;

  if (!servicePath) throw 'service-path not defined!';

  const serviceFilePath = api.resolve(`./src/store/services/${servicePath}.js`);

  if (fs.existsSync(serviceFilePath)) throw 'service already exists!';

  service = service.replace('%CLIENTPATH%', feathersClientPath);
  service = service.replace('%SERVICEPATH%', servicePath);
  service = service.replace('%IDFIELD%', serviceIdField);

  let instanceDefaultsFile = require.resolve('./templates/instanceDefaultsFn.js');

  if (options.service && options.service.instanceDefaults === 'obj') {
    instanceDefaultsFile = require.resolve('./templates/instanceDefaultsObj.js');
  }

  const instanceDefaults = fs.readFileSync(instanceDefaultsFile, { encoding: 'utf-8' });

  service = service.replace('%INSTANCEDEFAULTS%', instanceDefaults);

  fs.writeFileSync(serviceFilePath, service);
};
