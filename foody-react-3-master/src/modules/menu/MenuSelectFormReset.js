import React from 'react';

const MenuSelectFormReset = ({ categor }) => (
  <>
    <button
      type="button"
      // onSubmit={onSubmit}
    >
      Очистить фильтр
    </button>
    <p> Текущий фильтр: {categor} </p>
  </>
);

export default MenuSelectFormReset;
