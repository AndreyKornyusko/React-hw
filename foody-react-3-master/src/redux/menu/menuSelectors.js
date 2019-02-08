import { createSelector } from 'reselect';

const entityMenu = state => state.entity.menu;
const getMenuId = state => state.menu.menuIds;
// const itemId = state => state.menu.itemById;

const getMenu = createSelector(
  [entityMenu, getMenuId],
  (menu, ids) => {
    return ids.map(id => menu[id]);
  },
);

const getFoodCategories = state => state.menu.categories;

const getItemById = state => state.menu.itemById;

export default { getMenu, getItemById, getFoodCategories };
