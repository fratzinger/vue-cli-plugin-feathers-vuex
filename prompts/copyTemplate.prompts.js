const { validateEmpty } = require('./_utils.prompts');

const isCopyTemplate = (answers) => {
  return answers.actionType === 'copyTemplate';
};

// eslint-disable-next-line no-unused-vars
module.exports = pkg => {
  const prompts = [
    {
      when: isCopyTemplate,
      name: 'copyTemplate.folder',
      type: 'input',
      message: 'Which name should the template have?',
      default: 'default',
      validate: validateEmpty
    }
  ];

  return prompts;
};
