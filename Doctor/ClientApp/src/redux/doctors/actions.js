import {ADD_DOCTOR, GET_DOCTOR, DELETE_DOCTOR, UPDATE_DOCTOR} from './doctors';

export const getDoctor = (data) =>{
  return({
    type: GET_DOCTOR,
    payload: data
  })
}

export const addNewDoctor = (newDoctor) =>{
  return({
    type: ADD_DOCTOR,
    payload: newDoctor
  })
}
export const deleteContact = (id) => {
  return({
    type: DELETE_DOCTOR,
    payload: id
  })
}
export const updateDoctor = (data)=>{
  return({
    type:UPDATE_DOCTOR,
    payload: data
  })
}