import { get, post, put, del } from '../utils/request';

export const fetchTodos = () => get('/todos');
export const createTodo = (text) => post('/todos', { text });
export const updateTodo = (id, data) => put(`/todos/${id}`, data);
export const removeTodo = (id) => del(`/todos/${id}`);
