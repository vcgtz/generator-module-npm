module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-plusplus': 0,
    'no-prototype-builtins': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'] 
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  root: true,
};
