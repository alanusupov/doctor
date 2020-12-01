import {ADD_DOCTOR, DELETE_DOCTOR,GET_DOCTOR, UPDATE_DOCTOR} from './constants';

const initialState = {
  doctors: []
};

function DoctorReducer(state = initialState, action){
  console.log(state, action);
  switch(action.type){
    case ADD_DOCTOR:
      return {...state, doctors: [...state.doctors,action.payload]}
    case GET_DOCTOR:
       return { ...state, doctors: action.payload };
    case DELETE_DOCTOR:
      return {...state, doctors: state.doctors.filter(doctor => action.payload !== doctor.employeeId)}
    case UPDATE_DOCTOR:
      return {...state, doctors: state.doctors.map(item => item.id === action.payload.id ? action.payload : item)}
    default: 
    return state
  }
}
export default DoctorReducer;