import {ADD_SPEC, GET_SPEC, DELETE_SPEC, UPDATE_SPEC} from './constants';

export const getSpec = (data) =>{
  return({
    type: GET_SPEC,
    payload: data
  })
}

export const addNewSpec = (newSpec) =>{
  return({
    type: ADD_SPEC,
    payload: newSpec
  })
}
export const deleteSpec = (id) => {
  return({
    type: DELETE_SPEC,
    payload: id
  })
}
export const updateSpec = (data)=>{
  return({
    type:UPDATE_SPEC,
    payload: data
    
  })
}