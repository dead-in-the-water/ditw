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
  }
}
