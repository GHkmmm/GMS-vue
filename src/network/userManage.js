import { request } from './request';

export function getUser(page){
  return request({
    url: "/users",
    params: {
      page
    }
  })
}

export function addManager(username, phoneNum, email){
  return request({
    url: "/manageUser/add",
    method: "post",
    data: {
      username,
      phoneNum,
      email
    }
  })
}

export function editUser(userId,username, phoneNum, email, posId){
  return request({
    url: "/manageUser/edit",
    method: "post",
    data: {
      userId,
      username,
      phoneNum,
      email,
      posId
    }
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

export function queryUser(userId,username,phoneNum,email){
  return request({
    url: "/manageUser/query",
    params: {
      userId,
      username,
      phoneNum,
      email
    }
  })
}

export function getDeletedUsers(){
  return request({
    url: "/deletedUsers"
  })
}

export function rollbackUser(userId){
  return request({
    url: "/rollbackUser",
    method: "post",
    data: {
      userId
    }
  })
}