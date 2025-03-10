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
    // 配置 ESLint 规则，确保 React 在 JSX 作用域中可用s
    'react/react-in-jsx-scope': 'off',
    // 配置 Prettier 插件的规则
    // 'prettier/prettier': 'error' 表示将 Prettier 的格式化规则设置为错误级别
    // 这意味着如果代码不符合 Prettier 的格式化规则，将会抛出错误
    'prettier/prettier': 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
  },
};
