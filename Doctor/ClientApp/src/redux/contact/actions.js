import {ADD_CONTACT, GET_CONTACT, DELETE_CONTACT, UPDATE_CONTACT} from './constants';

export const getContact = (data) =>{
  return({
    type: GET_CONTACT,
    payload: data
  })
}

export const addNewContact = (newContact) =>{
  return({
    type: ADD_CONTACT,
    payload: newContact
  })
}
export const deleteContact = (id) => {
  return({
    type: DELETE_CONTACT,
    payload: id
  })
}
export const updateContact = (data)=>{
  return({
    type:UPDATE_CONTACT,
    payload: data
  })
}