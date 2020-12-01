import {ADD_RECEPTION, GET_RECEPTION, DELETE_RECEPTION, UPDATE_RECEPTION} from './constants';

export const getReception = (data) =>{
  return({
    type: GET_RECEPTION,
    payload: data
  })
}

export const addNewReception = (newReception) =>{
  return({
    type: ADD_RECEPTION,
    payload: newReception
  })
}
export const deleteReception = (id) => {
  return({
    type: DELETE_RECEPTION,
    payload: id
  })
}
export const updateReception = (data)=>{
  return({
    type:UPDATE_RECEPTION,
    payload: data
  })
}