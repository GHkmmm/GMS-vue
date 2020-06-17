import { request } from './request';

export function getCharge(){
    return request({
        url:"/place/searchCharge"
    })
}

export function getPlace(){
    return request({
        url:"/place/searchPlace"

    })
}

export function deletePlace(idPlace){
    return request({
        url:"/place/deletePlace",
        method:"post",
        data:{
            idPlace
        }
    })
}

export function addPlace(placeName,placeLocation){
      return request({
          url:"/place/addPlace",
          method:"post",
          data:{
              placeName,
              placeLocation
          }
      })
}
