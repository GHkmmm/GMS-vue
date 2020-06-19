import { request } from './request';

export function Login(username, password,code){
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
      code
    }
  })
}

export function Register(username, password, phoneNum, posId, email,code){
  return request({
    url: '/register',
    method: 'post',
    data: {
      username,
      password,
      phoneNum,
      posId,
      email,
      code
    }
  })
}

export function ChangePassword(password, username, phoneNum, email,code){
  return request({
    url: "/changePassword",
    method: "post",
    data: {
      password,
      username,
      phoneNum,
      email,
      code
    }
  })
}

export function GetValidateCode(){
  return request({
    url: "/getCaptchaImage"
  })
}

export function GetSession(){
  return request({
    url: "/getSession"
  })
}

export function Logout(){
  return request({
    url: "/logout"
  })
}

export function GetRoutes(posId){
  return request({
    url: "/getRoutes",
    params: {
      posId
    }
  })
}