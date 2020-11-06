import {ADD_DOCTOR, DELETE_DOCTOR,GET_DOCTOR, UPDATE_DOCTOR} from './constants';

const initialState = {
  doctors: []
};

function DoctorReducer(state = initialState, action){
  console.log(state, action);
  switch(action.type){
    case ADD_DOCTOR:
      return {...state, contacts: [...state.contacts,action.payload]}
    case GET_DOCTOR:
       return {...state, contacts: action.payload}
    case DELETE_DOCTOR:
      return {...state, contacts: state.contacts.filter(contact => action.payload !== contact.id)}
    case UPDATE_DOCTOR:
      return {...state, contacts: state.contacts.map(item => item.id === action.payload.id ? action.payload : item)}
    default: 
    return state
  }
}
export default DoctorReducer;