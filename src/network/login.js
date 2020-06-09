import { request } from './request';

export function Login(username, password){
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}