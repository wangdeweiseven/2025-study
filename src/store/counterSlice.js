// 引入 createSlice 函数从 @reduxjs/toolkit 库
// createSlice 是一个用于简化 Redux 逻辑的工具，可以自动生成 action 和 reducer
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => ({ ...state, count: state.count + 1 }),
    decrement: (state) => ({ ...state, count: state.count - 1 }),
    incrementByAmount: (state, action) => ({
      ...state,
      count: state.count + action.payload,
    }),
  },
});

// 从 counterSlice 对象中解构出 increment 和 decrement 两个 action 创建函数，并将它们导出
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
