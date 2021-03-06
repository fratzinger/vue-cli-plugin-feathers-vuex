module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': ['eslint:recommended'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'indent': ['warn', 2],
    'no-unused-vars': 'warn',
    'linebreak-style': 'off',
    'quotes': ['warn', 'single'],
    'global-require': 'warn',
    'semi': ['warn', 'always'],
    'no-console': 'off'
  },
  overrides: [
    {
      files: [
        '**/*.test.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
};
