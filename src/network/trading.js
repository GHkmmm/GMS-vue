import { request } from './request';

export function searchTrading(tradingId,userId,tradingType,tradingTime,count){
  return request({
    url: "/trading/search",
    params: {
        tradingId,
        userId,
        tradingType,
        tradingTime,
        count
    }
  })
}

export function addTrading(tradingType, counterParty, transactionAmount){
  return request({
    url: "/trading/add",
    method: "post",
    data:{
        tradingType,
        counterParty,
        transactionAmount
    }
  })
}

export function deleteTrading(tradingId){
  return request({
    url: "/trading/delete",
    method: "post",
    data: {
      tradingId
    }
  })
}

export function changeTrading(tradingId,userId,tradingType,counterParty,transactionAmount,tradingContent){
    return request({
      url: "/trading/change",
      data: {
        tradingId,
        userId,
        tradingType,
        counterParty,
        transactionAmount,
        tradingContent
      }
    })
  }

export function tradingTotal(tradingType){
  return request({
    url: "/trading/total",
    data: {
      tradingType
    }
  })
}