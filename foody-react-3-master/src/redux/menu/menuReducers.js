import types from './actionType';
import { combineReducers } from 'redux';

function menuReducer(state = [], { type, payload }) {
  switch (type) {
    case types.FETCH_SUCCESS:
      return payload;
    //  payload.ids
    default:
      return state;
  }
}

function categoryReducer(state = null, { type, payload }) {
  switch (type) {
    case types.FETCH_FOOD_CATEGORIES:
      return payload;
    default:
      return state;
  }
}

function error(state = null, { type, payload }) {
  switch (type) {
    case types.FETCH_ERROR:
      return payload;
    default:
      return state;
  }
}
function itemById(state = [], { type, payload }) {
  switch (type) {
    case types.ITEM_ID:
      return payload.ids;
    default:
      return state;
  }
}

export default combineReducers({
  menuIds: menuReducer,
  itemById,
  categories: categoryReducer,
  error,
});
