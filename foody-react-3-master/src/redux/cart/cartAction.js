import actionTypes from './cartActionType';

const addToCart = id => ({
  type: actionTypes.ADD_TO_CART,
  payload: { id },
});

const removeFromCart = id => ({
  type: actionTypes.REMOVE_FROM_CART,
  payload: { id },
});

const decrementCartItemAmount = id => ({
  type: actionTypes.DECREMENT_CART_ITEM_AMOUNT,
  payload: { id },
});

export default {
  addToCart,
  removeFromCart,
  decrementCartItemAmount,
};
