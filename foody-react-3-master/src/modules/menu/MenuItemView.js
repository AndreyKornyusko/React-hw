import React from 'react';

const MenuItemView = ({
  id,
  name,
  image,
  price,
  description,
  ingredients,
  goBackToMenu,
  children,
}) => (
  <div>
    <button type="button" onClick={goBackToMenu}>
      Назад к меню
    </button>
    <img src={image} alt={name} width={320} height={240} />
    <p>Name: {name}</p>
    <p>Description: {description}</p>
    <p>Ingredients: {ingredients}</p>
    <p>Price: {price}</p>
    {children}
  </div>
);

export default MenuItemView;
