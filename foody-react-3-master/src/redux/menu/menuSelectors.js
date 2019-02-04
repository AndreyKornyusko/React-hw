import { createSelector } from 'reselect';

const entityMenu = state => state.entity.menu;
const getMenuId = state => state.menu.menuIds;
const entityItemsById = state => state.entity.itemsById;
const itemId = state => state.menu.itemById;

const getMenu = state => state.menu.menuIds;
// createSelector(
//   [entityMenu, getMenuId],
//   (menu, ids) => {
//     return ids.map(id => menu[id]);
//   },
// )
const getFoodCategories = state => state.menu.categories;

const getItemById = createSelector(
  [itemId, entityItemsById],
  (ids, itemId) => {
    return ids.map(id => itemId[id]);
  },
);

export default { getMenu, getItemById, getFoodCategories };
