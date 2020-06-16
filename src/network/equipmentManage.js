import { request } from './request';

export function getEquipment(equipmentId,equipmentName,equipmentCost,equipmentStatus,equipmentRenterId){
  return request({
    url: "/equipment/search",
    method:'post',
    data:{
      equipmentId,
      equipmentName,
      equipmentCost,
      equipmentStatus,
      equipmentRenterId
    }
  })
}

export function addEquipment(equipmentId,equipmentName,equipmentCost){
  return request({
    url: "/equipment/add",
    method:'post',
    data:{
      equipmentId,
      equipmentName,
      equipmentCost
    }
  })
}

export function deleteEquipment(equipmentId){
  return request({
    url: "/equipment/delete",
    method:'post',
    data:{
      equipmentId,
    }
  })
}

export function rentEquipment(equipmentId,equipmentRenterId){
  return request({
    url: "/equipment/rent",
    method:'post',
    data:{
      equipmentId,
      equipmentRenterId
    }
  })
}

export function recycleEquipment(equipmentId){
  return request({
    url: "/equipment/recycle",
    method:'post',
    data:{
      equipmentId
    }
  })
}

export function standardEquipment(){
  return request({
    url: "/equipment/standard"
  })
}