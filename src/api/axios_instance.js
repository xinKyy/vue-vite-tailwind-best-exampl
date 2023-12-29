// axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: '/user_admin', // 你的API的基本URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    // 你可能还想在这里添加其他全局头部信息
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理

    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        token: token,
      };
    }

    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const resp = response.data;

    // 在响应返回之后做一些处理
    if (resp.resultCode === 200) {
      return resp;
    }

    if (resp.resultCode === 500) {
      if (resp.resultMessage) {
        this.Message.error(resp.resultMessage);
      } else {
        this.Message.error('网络异常！');
      }
      return resp;
    }

    // if (resp.resultCode === 10001) {
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('userStatus');
    //   window.location.href = '/login';
    //   Message.info('登录过期');
    //   return;
    // } else {
    //   Message.error(resp.resultMessage);
    // }

    return response;
  },
  (error) => {
    // if (error.response.status === 500) {
    //   window.location.href = '/exception/404';
    // }
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default axiosInstance;
