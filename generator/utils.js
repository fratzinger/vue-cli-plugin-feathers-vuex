const fs = require('fs');

const checkVuex = (api) => {
  const hasVuex = api.hasPlugin('vuex');
  if (!hasVuex) {
    throw 'Vuex not installed! Please run \'vue add vuex\' first!';
  }

  if (!api.resolve('./src/store.js') || !api.resolve('./src/store/index.js')) {
    throw 'Cannot find vuex file';
  }
};

const feathersFolderPath = './src/store/feathers';
const feathersClientFile = `${feathersFolderPath}/feathers.client.js`;
const feathersAuthFile = `${feathersFolderPath}/feathers.auth.js`;
const servicesPath = `${feathersFolderPath}/services`;
const modelsPath = `${feathersFolderPath}/models`;
const templatesFolder = `${feathersFolderPath}/.templates`;

const createFeathersFolder = (api) => {
  const feathersFolder = api.resolve(feathersFolderPath);
  if (!fs.existsSync(feathersFolder)) fs.mkdirSync(feathersFolder, { recursive: true });
};

const createServicesFolder = (api) => {
  const servicesFolder = api.resolve(servicesPath);
  if (!fs.existsSync(servicesFolder)) fs.mkdirSync(servicesFolder, { recursive: true });
};

const createModelsFolder = (api) => {
  const modelsFolder = api.resolve(modelsPath);
  if (!fs.existsSync(modelsFolder)) fs.mkdirSync(modelsFolder, { recursive: true });
};

module.exports = {
  checkVuex,
  createFeathersFolder,
  createServicesFolder,
  createModelsFolder,
  feathersFolderPath,
  feathersClientFile,
  feathersAuthFile,
  templatesFolder,
  servicesPath,
  modelsPath
};
