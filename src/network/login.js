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

export function Register(username, password, phoneNum, posId, email){
  return request({
    url: '/register',
    method: 'post',
    data: {
      username,
      password,
      phoneNum,
      posId,
      email
    }
  })
}