import { get, put } from '../utils/request';

export const getUserProfile = (userId) => get(`/users/${userId}`);
export const updateUserProfile = (userId, data) =>
  put(`/users/${userId}`, data);
export const changePassword = (data) => put('/users/change-password', data);
