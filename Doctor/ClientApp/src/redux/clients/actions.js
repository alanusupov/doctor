import {ADD_CLIENT, GET_CLIENT, DELETE_CLIENT, UPDATE_CLIENT} from './constants';

export const getClient = (data) =>{
  return({
    type: GET_CLIENT,
    payload: data
  })
}

export const updateClient = (data)=>{
  return({
    type:UPDATE_CLIENT,
    payload: data
    
  })
}