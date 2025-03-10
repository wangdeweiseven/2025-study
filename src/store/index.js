// 引入 Redux Toolkit 的 configureStore 函数
// Redux Toolkit 是 Redux 官方推荐的工具集，用于简化 Redux 应用程序的开发
// configureStore 是一个用于创建 Redux store 的函数，它简化了配置过程
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todosReducer from './toDoListSlice';
import layoutReducer from './layoutSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    layout: layoutReducer,
  },
});
