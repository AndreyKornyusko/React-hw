import types from './actionType';
import { normalize } from 'normalizr';

import * as schema from '../schemas/schema';

const fetchRequest = () => ({
  type: types.FETCH_REQUEST,
});

const fetchSuccess = menuItems => {
  const normMenu = normalize(menuItems, [schema.menuSchema]);

  return {
    type: types.FETCH_SUCCESS,
    payload: {
      ids: Object.keys(normMenu.entities.menu),
      entities: normMenu.entities,
    },
  };
};

const fetchItemById = item => {
  return {
    type: types.GET_ITEM_ID,
    payload: item,
  };
};

const fetchFoodCategies = categories => ({
  type: types.FETCH_FOOD_CATEGORIES,
  payload: categories,
});

const fetchError = error => ({
  type: types.FETCH_ERROR,
  payload: error,
});

export default {
  fetchError,
  fetchRequest,
  fetchSuccess,
  fetchItemById,
  fetchFoodCategies,
};
