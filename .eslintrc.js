module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:prettier/recommended', 'prettier', 'eslint:recommended'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'no-console': 0,
    'no-shadow': 'error',
    'no-param-reassign': 'error',
    'no-nested-ternary': 'error',
    'no-underscore-dangle': 0,
    'import/order': 0,
    'import/no-cycle': 0,
    'prefer-destructuring': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],
    'prettier/prettier': [
      2,
      {
        singleQuote: true,
        'editor.formatOnSave': true,
        proseWrap: 'always',
        requireConfig: false,
        useTabs: false,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        semi: true,
        tabWidth: 2,
        endOfLine: 'auto'
      }
    ]
  }
};
