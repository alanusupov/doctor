import {ADD_CONTACT, DELETE_CONTACT,GET_CONTACT, UPDATE_CONTACT} from './constants';

const initialState = {
  contacts: []
};

function ContactReducer(state = initialState, action){
  console.log(state, action);
  switch(action.type){
    case ADD_CONTACT:
      return {...state, contacts: [...state.contacts,action.payload]}
    case GET_CONTACT:
       return {...state, contacts: action.payload}
    case DELETE_CONTACT:
      return {...state, contacts: state.contacts.filter(contact => action.payload !== contact.id)}
    case UPDATE_CONTACT:
      return {...state, contacts: state.contacts.map(item => item.id === action.payload.id ? action.payload : item)}
    default: 
    return state
  }
}
export default ContactReducer;