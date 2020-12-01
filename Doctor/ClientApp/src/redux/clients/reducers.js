import {ADD_CLIENT, DELETE_CLIENT,GET_CLIENT, UPDATE_CLIENT} from './constants';

const initialState = {
  clients: []
};

function ClientReducer(state = initialState, action){
  console.log(state, action);
  switch(action.type){
    case GET_CLIENT:
       return { ...state, clients: action.payload };
    case UPDATE_CLIENT:
      return {...state, clients: state.clients.map(item => item.clientId == action.payload.clientId ? action.payload : item)}
    default: 
    return state
  }
}
export default ClientReducer;