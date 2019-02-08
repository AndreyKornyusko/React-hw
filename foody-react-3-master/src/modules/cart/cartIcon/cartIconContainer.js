import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartIconViev from './cartIconViev';

import selectors from '../../../redux/cart/cartSelector';

const mapState = state => ({
  amount: selectors.getCartProductsAmount(state),
});

export default connect(mapState)(CartIconViev);
