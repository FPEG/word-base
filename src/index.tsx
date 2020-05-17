import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

import { message } from 'antd';

import './assets/scss/test.scss'
import App from './components/App';

//添加请求拦截器
axios.interceptors.request.use(function (config) {
  //在发送请求之前做某事
  config.headers['Authorization'] = `Bearer ${localStorage["token"]}`
  return config;
}, function (error) {
  //请求错误时做些事
  // console.log(error);
  return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function (response) {
  //对响应数据做些事
  if (response.headers['authorization'] !== undefined)
    localStorage["token"] = response.headers['authorization'].replace("Bearer ", "")
  return response;
}, function (error) {
  //请求错误时做些事
  message.warning(error.response.data.error);
  return Promise.reject(error);
});

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/dapi/wordbase';
}
else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = '/api/wordbase';
}



if (localStorage["token"] === undefined) {
  if (process.env.REACT_APP_ENVIRONMENT === 'test') {
    window.history.pushState({},"","/login")
  }
  // if (process.env.NODE_ENV === 'production') {
  //   // window.location.href = 'http://localhost:3001/login';
  //   window.location.href = 'http://baidu.com';
  // }
  // if (process.env.NODE_ENV === 'development') {
  //   window.location.href = 'http://baidu.com';
  // }
}
else {
  ReactDOM.render(
    <App />
    ,
    document.getElementById('root')
  )
}

