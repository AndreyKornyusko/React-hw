import {
  getAllMenuItems,
  getItemsById,
  getCategories,
  getMenuItemsWithCategory,
} from '../../services/axiosApi';

import action from './actionMenu';

const fetchMenuItems = () => dispatch => {
  dispatch(action.fetchRequest());

  getAllMenuItems()
    .then(Items => dispatch(action.fetchSuccess(Items)))
    .catch(error => dispatch(action.fetchError(error)));
};

const fetchMenuItemsById = id => dispatch => {
  dispatch(action.fetchRequest());
  getItemsById(id)
    .then(item => {
      // console.log('menuitem', item);
      dispatch(action.fetchItemById(item));
    })
    .catch(error => dispatch(action.fetchError(error)));
};

const fetchFoodCategories = () => dispatch => {
  dispatch(action.fetchRequest());
  getCategories()
    .then(categories => categories.map(item => item.name))
    .then(categories => dispatch(action.fetchFoodCategies(categories)))
    .catch(error => dispatch(action.fetchError(error)));
};

const fetchMenuItemsWithCategory = category => dispatch => {
  dispatch(action.fetchRequest());
  getMenuItemsWithCategory(category)
    .then(items => dispatch(action.fetchSuccess(items)))
    .catch(error => dispatch(action.fetchError(error)));
};

export default {
  fetchMenuItems,
  fetchMenuItemsById,
  fetchFoodCategories,
  fetchMenuItemsWithCategory,
};
