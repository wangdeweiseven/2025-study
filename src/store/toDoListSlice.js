// 引入 createSlice 和 nanoid 函数，createSlice 用于创建 Redux slice，nanoid 用于生成唯一 ID
import { createSlice, nanoid } from '@reduxjs/toolkit';

// 创建一个名为 counterSlice 的 Redux slice
export const todosSlice = createSlice({
  // 定义 slice 的名称为 'todos'
  name: 'todos',
  // 定义 slice 的初始状态
  initialState: {
    // list 数组，包含两个初始的 todo 对象
    list: [
      { id: nanoid(), text: 'Learn React', completed: false }, // 生成唯一 ID，文本为 'Learn React'，完成状态为 false
      { id: nanoid(), text: 'Master Redux', completed: true }, // 生成唯一 ID，文本为 'Master Redux'，完成状态为 true
    ],
    // 当前正在编辑的 todo 对象，初始为 null
    editingTodo: null,
  },
  // 定义 slice 的 reducer 函数
  reducers: {
    // 定义一个名为 addTodo 的对象，用于处理添加待办事项的逻辑
    addTodo: {
      // 定义一个 prepare 函数，用于准备 action 的 payload
      prepare(text) {
        // 返回一个对象，其中包含 payload 属性
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
          },
          type: 'todos/addTodo',
        };
      },
      // 定义一个 reducer 函数，用于更新状态
      reducer(state, action) {
        // 将 action.payload（即新的待办事项）添加到 state.todos 数组中
        state.list.push(action.payload);
      },
    },
    deleteTodo(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    startEditeTodo(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.editingTodo = action.payload;
    },
    saveTodo(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.list = state.list.map((todo) => {
        if (todo.id === state.editingTodo) {
          return {
            ...todo,
            text: action.payload,
          };
        }
        return todo;
      });
      // eslint-disable-next-line no-param-reassign
      state.editingTodo = null;
    },

    toggleComplete(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.list = state.list.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    },
  },
});
// 从 counterSlice 对象中解构出 increment 和 decrement 两个 action 创建函数，并将它们导出
export const { addTodo, deleteTodo, startEditeTodo, saveTodo, toggleComplete } =
  todosSlice.actions;
export default todosSlice.reducer;
