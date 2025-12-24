module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:next/recommended', // Next.js plugin
  ],
  parser: '@babel/eslint-parser', // If you're using Babel
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 'off', // Example: Disable prop-types rule
    'no-console': 'warn', // Example: Show console.log warnings
  },
};
