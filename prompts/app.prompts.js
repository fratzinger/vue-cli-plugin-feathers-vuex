const {
  validateEmpty
} = require('./_utils.prompts');

const makeServicePrompts = require('./service.prompts');

const isApp = (answers) => {
  return !answers.actionType || answers.actionType === 'app';
};

const isAuth = (answers) => {
  return isApp(answers) && answers.app.isAuth;
};

const makePrompts = (pkg) => {
  const prompts = [
    {
      when: isApp,
      name: 'app.serverUrl',
      type: 'input',
      message: 'What is the url of your feathers server instance?',
      default: 'http://localhost:3030',
      validate: validateEmpty
    },
    {
      when: isApp,
      name: 'app.serverAlias',
      type: 'input',
      message: 'What is the serverAlias?',
      default: 'api',
      validate: validateEmpty
    },
    {
      when: isApp,
      name: 'app.idField',
      type: 'input',
      message: 'What is the idField (mongo: \'_id\', sequelize: \'id\')?',
      default: '_id',
      validate: validateEmpty
    },
    {
      when: isApp,
      name: 'app.isAuth',
      type: 'confirm',
      message: 'Setup authentication (highly recommened)?',
      default: true,
    }
  ];
  const servicePrompts = makeServicePrompts(pkg, 'users');
  servicePrompts.forEach(question => {
    question.when = isAuth;
  });
  
  prompts.push(...servicePrompts);
  return prompts;
};

module.exports = makePrompts;
