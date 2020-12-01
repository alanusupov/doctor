import {ADD_RECEPTION, DELETE_RECEPTION,GET_RECEPTION, UPDATE_RECEPTION} from './constants';

const initialState = {
  receptions: []
};

function ReceptionReducer(state = initialState, action){
  console.log(state, action);
  switch(action.type){
    case ADD_RECEPTION:
      return {...state, receptions: [...state.receptions,action.payload]}
    case GET_RECEPTION:
       return { ...state, receptions: action.payload };
    case DELETE_RECEPTION:
      return {...state, receptions: state.receptions.filter(reception => action.payload !== reception.receptionId)}
    case UPDATE_RECEPTION:
      return {...state, receptions: state.receptions.map(item => item.receptionId === action.payload.receptionId ? action.payload : item)}
    default: 
    return state
  }
}
export default ReceptionReducer;