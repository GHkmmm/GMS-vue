import { request } from './request';

export function getGame(page){
  return request({
    url: "/game/game",
    params: {//GET请求最好是在parameters里面设置，而POST请求就在Body Data里面设置
      page
    }
  })
}

export function addGame(gameId,gameName,event,holdingTime,sponsor,userId){
    return request({
      url: "/game/add",
      method:'post',
      data:{
        gameId,
        gameName,
        event,
        holdingTime,
        sponsor,
        userId
      }
    })
  }

  export function deleteGame(gameId){
    return request({
      url: "/game/delete",
      method:'post',
      data:{
        gameId
      }
    })
  }

