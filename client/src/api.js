// client/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // .env.production 값
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 임시 확인용(배포 후 콘솔에서 찍힘): URL 제대로 들어갔는지 확인
console.log('API URL =', import.meta.env.VITE_API_BASE_URL);

export default api;
