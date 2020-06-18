import { request } from './request';

export function searchTrading(tradingId,userId,tradingType,tradingTimeBegin,tradingTimeEnd,count){
  return request({
    url: "/trading/search",
    params: {
        tradingId,
        userId,
        tradingType,
        tradingTimeBegin,
        tradingTimeEnd,
        count
    }
  })
}

export function addTrading(tradingType, counterParty, transactionAmount,tradingContent){
  return request({
    url: "/trading/add",
    method: "post",
    data:{
        tradingType,
        counterParty,
        transactionAmount,
        tradingContent
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
      method: "post",
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

export function totalAmount(tradingType){
  return request({
    url: "/trading/total",
    params: {
      tradingType
    }
  })
}