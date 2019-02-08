import { combineReducers } from 'redux';

import { menuReducer, entityReducer } from './menu';
import cartReducer from './cart/cartReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  cart: cartReducer,
  entity: entityReducer,
});

export default rootReducer;
