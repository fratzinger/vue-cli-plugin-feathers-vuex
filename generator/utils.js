const fs = require('fs');
const path = require('path');

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

const nthIndex = (str, pat, n) => {
  var L= str.length, i= -1;
  while(n-- && i++<L){
    i= str.indexOf(pat, i);
    if (i < 0) break;
  }
  return i;
};

module.exports = {
  checkVuex,
  createFeathersFolder,
  createServicesFolder,
  createModelsFolder,
  feathersFolderPath,
  feathersClientFile,
  feathersAuthFile,
  servicesPath,
  modelsPath,
  nthIndex
};
