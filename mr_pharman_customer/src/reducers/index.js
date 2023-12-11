import { combineReducers } from 'redux';
import CurrentAddressReducer from './CurrentAddressReducer.js';
import PharmOrderReducer from './PharmOrderReducer.js';
import PrescriptionOrderReducer from './PrescriptionOrderReducer.js';

const allReducers = combineReducers({
  current_location:CurrentAddressReducer,
  order:PharmOrderReducer,
  prescription_order:PrescriptionOrderReducer,
});

export default allReducers;