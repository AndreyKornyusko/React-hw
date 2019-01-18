import React from 'react';

const MenuSelectFormReset = ({ categor, Submit }) => (
  <>
    <button type="button" onClick={Submit}>
      Очистить фильтр
    </button>
    <p> Текущий фильтр: {categor} </p>
  </>
);

export default MenuSelectFormReset;
