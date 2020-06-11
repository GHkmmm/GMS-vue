import { request } from './request';

export function getUser(){
  return request({
    url: "/users"
  })
}

export function editUser(username, phoneNum, email, posId){
  return request({
    url: "/manageUser/edit",
    method: "post"
  })
}

export function deleteUser(userId){
  return request({
    url: "/manageUser/delete",
    method: "post",
    data: {
      userId
    }
  })
}

export function queryUser(username){
  return request({
    url: "/manageUser/query",
    data: {
      username
    }
  })
}