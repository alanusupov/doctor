import {ADD_SPEC, DELETE_SPEC,GET_SPEC, UPDATE_SPEC} from './constants';

const initialState = {
  specs: []
};

function SpecReducer(state = initialState, action){
  console.log(state, action);
  switch(action.type){
    case ADD_SPEC:
      return {...state, specs: [...state.specs,action.payload]}
    case GET_SPEC:
       return { ...state, specs: action.payload };
    case DELETE_SPEC:
      return {...state, specs: state.specs.filter(spec => action.payload !== spec.specialtyId)}
    case UPDATE_SPEC:
      return {...state, specs: state.specs.map(item => item.specialtyId == action.payload.specialtyId ? action.payload : item)}
    default: 
    return state
  }
}
export default SpecReducer;