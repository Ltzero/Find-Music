// 引入axios
import axios from 'axios';
import { message } from 'antd';

// 新建一个axios实例
const service = axios.create({
  baseURL: 'https://v1.itooi.cn/netease',
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => 
    // 请求前操作
    // if() {}
     config
  ,
  (error) => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
  // 处理响应结果
  (response) => {
    // console.log(response)
    switch (response.status) {
      case 200:
        if (response.headers['content-type'] === 'audio/mpeg') return response.request.responseURL;
        return response.data;
      case 403:
        message.warning('请求似乎被拒绝了,试试别的吧......', 5);
        return Promise.reject(response.status);
    }
    return response;
  },

  // 处理出错
  (error) => {
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      message.warning('请求超时了,请稍后重试......', 5);
      return Promise.reject(error);         
    }
    return Promise.reject(error); 
  },
);
export default service;

