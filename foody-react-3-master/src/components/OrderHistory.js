import React from 'react';

const OrderHistory = ({ items, onShowMoreInfo, onDelete }) => (
  <div className="table-wrapper">
    <table className="order-table">
      <tbody>
        <tr className="order-table__head">
          <th>Date</th>
          <th>Price</th>
          <th>Delivery Address</th>
          <th>Rating</th>
          <th />
        </tr>
        {items.map(item => (
          <tr className="order-table__row" key={item.id}>
            <td>{item.date}</td>
            <td>{item.price}</td>
            <td>{item.address}</td>
            <td>{item.rating}</td>
            <td>
              <button type="button" onClick={() => onDelete(item.id)}>
                Delete
              </button>
              <button type="button" onClick={() => onShowMoreInfo(item.id)}>
                Show more info
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderHistory;
