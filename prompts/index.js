const _get = require('lodash/get');

const makeAppPrompts = require('./app.prompts');
const makeServicePrompts = require('./service.prompts');
const makeCopyTemplatePrompts = require('./copyTemplate.prompts');
const makeServiceFromTemplatePrompts = require('./serviceFromTemplate.prompts');

const hasFVDependency = (pkg) => _get(pkg, 'dependencies["feathers-vuex"]');

module.exports = pkg => {
  if (!hasFVDependency(pkg)) {
    return makeAppPrompts(pkg);
  }

  const prompts = [
    {
      name: 'actionType',
      type: 'list',
      message: 'What do you want to do?',
      choices: [
        {
          name: 'add service',
          value: 'service',
        }, {
          name: 'add service from custom template',
          value: 'serviceFromTemplate'
        }, {
          name: 'copy template to feathers folder',
          value: 'copyTemplate'
        }, {
          name: 'init feathers-vuex',
          value: 'app',
        }
      ],
      default: 0,
    },
    ...makeServicePrompts(pkg),
    ...makeServiceFromTemplatePrompts(pkg),
    ...makeCopyTemplatePrompts(pkg),
    ...makeAppPrompts(pkg),
  ];

  return prompts;
};
