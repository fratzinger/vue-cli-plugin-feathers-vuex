const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const { 
  createServicesFolder,
  createModelsFolder
} = require('../utils');

const filesInFolder = (folder) => {
  const files = fs.readdirSync(folder, { encoding: 'utf-8' });

  return files.map(file => {
    return path.join(folder, file);
  });
};

const linesForFile = (file) => {
  let lines = fs.readFileSync(file, { encoding: 'utf-8' });
  return lines.split(/\r?\n/g);
};

const fileCheckYaml = (file) => {
  let lines = linesForFile(file);
  if (lines.length < 3 || lines[0] !== '---' || lines.indexOf('---', 1) === -1) {
    throw `${file} not containing yaml!`;
  }
};

const filesCheckYaml = (files) => {
  files.forEach(fileCheckYaml);
};

const getDestinationForFile = (file) => {
  fileCheckYaml(file);
  let lines = linesForFile(file);
  const indexEndOfYaml = lines.indexOf('---', 1);
  
  let lineDestination = lines.find((line, i) => line.trim().startsWith('to:') && i < indexEndOfYaml);
  if (!lineDestination) { throw `${file} cannot find destination`; }
  const destination = lineDestination.match(/'([^']+)'/)[1];
  return destination;
};

module.exports = (api, options) => {
  if (!api.hasPlugin('feathers-vuex')) {
    throw 'FeathersVuex not installed! Please run \'vue add feathers-vuex\' or \'npm i feathers-vuex\' first!';
  }

  createServicesFolder(api);
  createModelsFolder(api);

  const fromFolder = options.fromFolder || path.join(__dirname, '../templates/service');
  const filesInTemplateFolder = filesInFolder(fromFolder);
  filesCheckYaml(filesInTemplateFolder);
  filesInTemplateFolder.forEach(file => {
    let destination = getDestinationForFile(file);
    destination = ejs.render(destination, options);
    const absoluteDestination = api.resolve(destination);
    if (fs.existsSync(absoluteDestination)) {
      console.error(`file at ${absoluteDestination} already exists! It will not be overwritten!`);
      return;
    }
    api.render({
      [destination]: file
    }, options);
  });
};
