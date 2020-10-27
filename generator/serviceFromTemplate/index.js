const fs = require('fs');
const path = require('path');
const createService = require('../service');

const {
  templatesFolder
} = require('../utils');

module.exports = (api, options) => {
  if (!options.templateName) {
    throw 'no templateName';
  }
  const relativeFolder = path.join(templatesFolder, options.templateName);
  const absoluteFolder = api.resolve(relativeFolder);
  if (!fs.existsSync(api.resolve(templatesFolder))) {
    throw 'there is no \'.templates\' folder in your application please run \'vue invoke feathers-vuex\' > \'copy template to feathers folder\' first';
  }

  if (!fs.existsSync(absoluteFolder)) {
    throw `template: '${options.templateName}' does not exist in folder: '${api.resolve(templatesFolder)}'. Please create the custom template first by running: 'vue invoke feathers-vuex' > 'copy template to feathers folder' > 'name of the template?' = '${options.templateName}'!`;
  }

  createService(api, {
    ...options,
    fromFolder: absoluteFolder
  });
};
