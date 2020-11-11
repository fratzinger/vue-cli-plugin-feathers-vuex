const _trim = require('lodash/trim');
const _camelCase = require('lodash/camelCase');
const _upperFirst = require('lodash/upperFirst');
const inflection = require('inflection');

const {
  validateEmpty
} = require('./_utils.prompts');

const isService = (answers) => {
  return answers.actionType === 'service';
};

const defaultNamespace = (answers) => {
  const { servicePath } = answers.service;
  let namespace = _trim(servicePath, '/');
  if (namespace.includes('/')) {
    namespace = namespace.slice(namespace.lastIndexOf('/') + 1);
  }
  return namespace;
};

const defaultModelName = (answers) => {
  const { namespace } = answers.service;
  let modelName = _trim(namespace, '/');
  if (modelName.includes('/')) {
    modelName = modelName.slice(modelName.lastIndexOf('/') + 1);
  }
  
  modelName = inflection.singularize(modelName);
  modelName = _camelCase(modelName);
  modelName = _upperFirst(modelName);

  return modelName;
};

// eslint-disable-next-line no-unused-vars
const makePrompts = (pkg, defaultPath) => {
  const prompts = [
    {
      when: isService,
      name: 'service.servicePath',
      type: 'input',
      message: 'What is the path of the service?',
      default: defaultPath || '',
      validate: validateEmpty
    },
    {
      when: isService,
      name: 'service.namespace',
      type: 'input',
      message: 'What should be the vuex namespace for the service?',
      default: defaultNamespace,
      validate: validateEmpty
    },
    {
      when: isService,
      name: 'service.modelName',
      type: 'input',
      message: 'What should be the model name?',
      default: defaultModelName,
      validate: validateEmpty
    }
  ];

  return prompts;
};

module.exports = makePrompts;
