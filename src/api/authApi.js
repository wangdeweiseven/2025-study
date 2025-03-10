import { post, get } from '../utils/request';

export const login = (credentials) => post('/auth/login', credentials);
export const register = (userInfo) => post('/auth/register', userInfo);
export const getCurrentUser = () => get('/auth/me');
export const refreshToken = () => post('/auth/refresh-token');
