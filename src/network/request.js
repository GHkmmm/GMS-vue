import axios from 'axios';

export function request(config){
  const instance = axios.create({
    // baseURL: "/api",
    withCredentials: true,
    // baseURL: "http://localhost:1003/",
    baseURL: "http://106.15.201.34:1003/",
    timeout: 5000
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