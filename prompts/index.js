const makeAppPrompts = require('./app.prompts');
const makeServicePrompts = require('./service.prompts');
const _get = require('lodash/get');

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
          name: 'init feathers-vuex',
          value: 'app',
        }, {
          name: 'add service',
          value: 'service',
        },
      ],
      default: 0,
    },
    ...makeAppPrompts(pkg),
    ...makeServicePrompts(pkg)
  ];

  return prompts;
};
