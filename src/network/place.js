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

export function addPlace(placeName,location){
      return request({
          url:"/place/addPlace",
          method:"post",
          data:{
              placeName,
              location
          }
      })
}

export function changePlace(idPlace,placeName,location){
    return request({
        url:"/place/changePlace",
        method:"post",
        data:{
            idPlace,
            placeName,
            location
        }
    })

}
export function searchUserBook(userId){
     return request({
         url:"/place/searchUserAppointment",
         data:{
             userId
         }
     })
}