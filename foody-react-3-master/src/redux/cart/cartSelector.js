import { createSelector } from 'reselect';

const getProductsEntities = state => state.entity.menu;
const getCartProductIds = state => state.cart.ids;
const getCartProductAmounts = state => state.cart.amount;

const getCartProductsAmount = createSelector(
  getCartProductIds,
  ids => ids.length,
);

export const getCartProducts = createSelector(
  [getCartProductIds, getCartProductAmounts, getProductsEntities],
  (ids, amounts, entities) =>
    ids.map(id => ({
      ...entities[id],
      amount: amounts[id],
    })),
);

export default { getCartProductsAmount, getCartProducts };
