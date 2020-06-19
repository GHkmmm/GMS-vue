import { request } from './request';
import { expr } from 'jquery';

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
         params:{
             userId
         }
     })
}
export function addAppointment( idPlace,placeName, startAppointment,overAppointment, week,purpose, light,userId){
    return request({
        url:"/place/addAppointment",
        method:"post",
        data:{
           idPlace,
           placeName,
           startAppointment,
           overAppointment,
           week,purpose,
           light,
           userId
        }
    })

}
export function deleteAppointment(idAppointment){
    return request({
        url:"/place/deleteAppointment",
        method:"post",
        data:{
            idAppointment
        }
    })
}
export function changeAppointment(                
   idAppointment,
   week,
    startAppointment,
    overAppointment,
    placeName,
    location,
    purpose,
   light){
    return request({
        url:"place/changeAppointment",
        method:"post",
        data:{
            idAppointment,
            week,
            startAppointment,
            overAppointment,
            placeName,
            location,
            purpose,
            light
        }
    })
}