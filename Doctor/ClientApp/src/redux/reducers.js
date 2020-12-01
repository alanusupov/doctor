import {combineReducers} from 'redux';
import DoctorReducer from './doctors/reducers'
import SpecReducer from './specs/reducers'
import ReceptionReducer from './receptions/reducers'
import ClientReducer from './clients/reducers'

export const rootReducer = combineReducers({
  DoctorReducer,
  SpecReducer,
  ReceptionReducer,
  ClientReducer
  
});