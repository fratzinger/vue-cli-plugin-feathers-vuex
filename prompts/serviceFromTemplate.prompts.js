const { validateEmpty } = require('./_utils.prompts');
const makeServicePrompts = require('./service.prompts');

const isServiceFromTemplate = (answers) => {
  return answers.actionType === 'serviceFromTemplate';
};

module.exports = pkg => {
  const prompts = [
    {
      when: isServiceFromTemplate,
      name: 'serviceFromTemplate.templateName',
      type: 'input',
      message: 'What is the name of the template (folder-name in the ".templates" folder)?',
      default: 'default',
      validate: validateEmpty
    }
  ];
  const servicePrompts = makeServicePrompts(pkg);
  servicePrompts.forEach(question => {
    question.when = isServiceFromTemplate;
  });

  prompts.push(...servicePrompts);

  return prompts;
};
