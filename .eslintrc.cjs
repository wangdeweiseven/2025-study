// .eslintrc.cjs
module.exports = {
  env: { browser: true, es2021: true },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
  },
};
