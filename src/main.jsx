import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@ant-design/v5-patch-for-react-19';

import store from './store';
import App from './App';
// import Game from './components/game';
// 渲染应用

ReactDOM.createRoot(document.getElementById('root')).render(
  // 使用React的StrictMode组件，这个组件可以帮助检测潜在的问题，例如使用过时的API、不安全的生命周期方法等
  <React.StrictMode>
    {/* 使用Provider组件，它是React-Redux库的一部分，用于将Redux的store传递给整个应用
    store是Redux的存储对象，包含了应用的状态和状态管理逻辑 */}
    <Provider store={store}>
      {/* App组件是应用的根组件，它将包含所有的子组件和页面 */}
      <App />
      {/* <Game /> */}
    </Provider>
  </React.StrictMode>
);
