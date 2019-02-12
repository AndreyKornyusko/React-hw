import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../configs/routes';
import s from './menuGrid.module.css';

import MenuCard from './MenuCard';

const MenuGrid = ({ items, addToCart }) => (
  <>
    <div className={s.containerMenu}>
      <ul className={s.containerMenu}>
        {items.map(item => (
          <li className={s.itemCard} key={item.id}>
            <Link to={`${routes.MENU}/${item.id}`}>
              <MenuCard {...item} />
            </Link>
            <button type="button" onClick={() => addToCart(item.id)}>
              Добавить в корзину
            </button>
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default MenuGrid;
