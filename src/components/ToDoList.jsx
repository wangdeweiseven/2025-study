import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  deleteTodo,
  startEditeTodo,
  saveTodo,
  toggleComplete,
} from '../store/toDoListSlice';

function TodoList() {
  const todoList = useSelector((state) => state.todos.list);
  const editingTodoId = useSelector((state) => state.todos.editingTodo);
  const dispatch = useDispatch();

  // 使用useState钩子来管理待办事项列表和用户输入
  const [input, setInput] = useState('');
  const [editText, setEditText] = useState('');

  // 处理输入变化
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // 添加新的待办事项
  const handleAdd = () => {
    if (input.trim() !== '') {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={input} onChange={handleInputChange} />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todoList.map((todo) => (
          <li key={todo.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleComplete(todo.id))}
              />
              {editingTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    type="button"
                    style={{ color: 'blue', marginLeft: '10px' }}
                    onClick={() => {
                      dispatch(saveTodo(editText));
                    }}
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    style={{ color: 'blue', marginLeft: '10px' }}
                    onClick={() => {
                      dispatch(startEditeTodo(null));
                    }}
                  >
                    取消
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      flex: 1,
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                  >
                    {todo.text}
                  </span>
                  <button
                    type="button"
                    style={{ color: 'green', marginLeft: '10px' }}
                    onClick={() => {
                      dispatch(startEditeTodo(todo.id));
                      setEditText(todo.text);
                    }}
                  >
                    编辑
                  </button>
                </>
              )}
              <button
                type="button"
                style={{ color: 'red' }}
                onClick={() => {
                  dispatch(deleteTodo(todo.id));
                }}
              >
                删除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
