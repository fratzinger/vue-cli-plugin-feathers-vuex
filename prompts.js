module.exports = [
  {
    name: 'actionType',
    type: 'list',
    message: 'What do you want to do?',
    choices: [
      {
        name: 'init feathers-vuex',
        value: 'init',
      }, {
        name: 'add service',
        value: 'service',
      },
    ],
    default: 0,
  },
  // #region init
  {
    when: answers => answers.actionType === 'init',
    name: 'init.serverUrl',
    type: 'input',
    message: 'What is the url of your feathers server instance?',
    default: 'http://localhost:3030',
  },
  {
    when: answers => answers.actionType === 'init',
    name: 'init.isAuth',
    type: 'confirm',
    message: 'Setup authentication (highly recommened)?',
    default: true,
  },
  {
    when: answers => answers.actionType === 'init' && answers.init.isAuth === true,
    name: 'init.authIdField',
    type: 'input',
    message: 'What is the id-key of your auth service?',
    default: 'id',
  },
  {
    when: answers => answers.actionType === 'init' && answers.init.isAuth === true,
    name: 'init.authUserService',
    type: 'input',
    message: 'What is the name of your users-service for authentication?',
    default: 'users',
  },
  // #endregion
  // #region generate service
  {
    when: answers => answers.actionType === 'service',
    name: 'service.path',
    type: 'input',
    message: 'What is the name of the service?',
    default: '',
  },
  {
    when: answers => answers.actionType === 'service',
    name: 'service.idField',
    type: 'input',
    message: 'What is the id-key of the service?',
    default: 'id',
  },
  {
    when: answers => answers.actionType === 'service',
    name: 'service.feathersClientPath',
    type: 'input',
    message: 'Where is your feathers-client file located?',
    default: '@/store/feathers-client.js',
  },
  {
    when: answers => answers.actionType === 'service',
    name: 'service.instanceDefaults',
    type: 'list',
    message: 'Use instanceDefaults as function or object? (function recommended)',
    choices: [
      {
        name: 'function',
        value: 'fn',
      }, {
        name: 'object',
        value: 'obj',
      },
    ],
    default: 0,
  },
  {
    when: answers => answers.actionType === 'service',
    name: 'service.isCustomize',
    type: 'confirm',
    message: 'Do you want to customize the service?',
    default: false,
  },
  {
    when: answers => answers.actionType === 'service' && answers.service.isCustomize,
    name: 'service.customize',
    type: 'checkbox',
    message: 'What do you want to add?',
    choices: [
      {
        name: 'add state, getters, mutations & actions',
        value: 'store',
        checked: true,
      },
    ],
    default: 0,
  },
  // #endregion
];
