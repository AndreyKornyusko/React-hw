import React from 'react';
import s from './cart.module.css';

const Cart = ({
  products = [],
  removeFromCart,
  incrementCartItemAmount,
  decrementCartItemAmount,
}) =>
  products.length > 0 ? (
    <table className={s.table}>
      <tbody>
        {products.map(({ id, name, amount }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>
              <button onClick={() => incrementCartItemAmount(id)}>+</button>
              {amount}
              <button onClick={() => decrementCartItemAmount(id)}>-</button>
            </td>
            <td>
              <button onClick={() => removeFromCart(id)}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h1>В корзине нет товаров!</h1>
  );

export default Cart;
