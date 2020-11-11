const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

const { 
  templatesFolder 
} = require('../utils');

const copyTemplate = (api, options) => {
  const relativeFolder = path.join(templatesFolder, options.folder);
  const absoluteFolder = api.resolve(relativeFolder);
  if (fs.existsSync(absoluteFolder)) {
    console.error(`Folder ${absoluteFolder} already exists. Copy templates to this folder will be skipped!`);
  }
  fs.mkdirSync(absoluteFolder, { recursive: true });
  fse.copySync(path.resolve(__dirname, '../templates/service'), absoluteFolder);
};

module.exports = (api, options) => {
  copyTemplate(api, options);
};
