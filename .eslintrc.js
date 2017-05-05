module.exports = {
  'extends': ['standard', 'eslint:recommended', 'plugin:react/recommended'],
  'plugins': [
    'standard',
    'promise',
    'react',
    'babel'
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'allowImportExportEverywhere': false,
    'codeFrame': false
  },
  'rules': {
    'babel/new-cap': 1,
    'babel/object-curly-spacing': ['warn', 'always'],
    'babel/no-invalid-this': 1,
    'babel/semi': ['error', 'never'],
    'new-cap': 0,
    'object-curly-spacing': 0,
    'no-invalid-this': 0,
    'semi': 0
  }
}
