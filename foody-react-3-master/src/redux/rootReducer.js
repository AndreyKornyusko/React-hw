import { combineReducers } from 'redux';

import { menuReducer, entityReducer } from './menu';
// import {cartReducer} from './shopingCart'

const rootReducer = combineReducers({
  menu: menuReducer,
  // shopingCart:cartReducer,
  entity: entityReducer,
});

export default rootReducer;
