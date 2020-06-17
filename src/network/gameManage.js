import { request } from './request';

export function getGame(){
  return request({
    url: "/game/game"
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

