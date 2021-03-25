import axios from 'axios';

export function request(config){
  const instance = axios.create({
    // baseURL: "/api",
    withCredentials: true,
    crossDomain: true,
    baseURL: "http://localhost:1003/",
    timeout: 3600
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config);
}