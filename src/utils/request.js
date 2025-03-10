// eslint-disable-next-line
import axios from 'axios';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 使用Vite环境变量
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorObj = { ...error };
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorObj.message = '身份验证失败，请重新登录';
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
          break;
        case 403:
          errorObj.message = '拒绝访问';
          break;
        case 500:
          errorObj.message = '服务器内部错误';
          break;
        default:
          errorObj.message = `连接错误 ${error.response.status}`;
      }
    } else if (error.request) {
      errorObj.message = '服务器无响应';
    }
    return Promise.reject(errorObj);
  }
);

export const get = (url, params) => service.get(url, { params });
export const post = (url, data) => service.post(url, data);
export const put = (url, data) => service.put(url, data);
export const del = (url, params) => service.delete(url, { params });
