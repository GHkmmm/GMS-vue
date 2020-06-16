import {request } from './request';

export function getCharge(){
    return request({
        url:"/place/searchCharge",
        method:'GET',
        params:{
            idCharge,
            placeName,
            startCharge,
            overCharge,
            light,
            cost
        }
    })
}