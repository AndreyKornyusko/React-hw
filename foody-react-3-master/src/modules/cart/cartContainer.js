import { connect } from 'react-redux';
import CartViev from './cartViev';
import selectors from '../../redux/cart/cartSelector';
import actions from '../../redux/cart/cartAction';

const mapState = state => ({
  products: selectors.getCartProducts(state),
});

const mapDispatch = {
  removeFromCart: actions.removeFromCart,
  incrementCartItemAmount: actions.addToCart,
  decrementCartItemAmount: actions.decrementCartItemAmount,
};

export default connect(
  mapState,
  mapDispatch,
)(CartViev);
