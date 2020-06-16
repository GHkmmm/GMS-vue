import { request } from './request';

export function getCharge(){
    return request({
        url:"/place/searchCharge"
    })
}