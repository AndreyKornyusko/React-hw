import React from 'react';

const styles = {
  select: {
    fontSize: 20,
  },
};

const MenuCategorySelectForm = ({
  options,
  value,
  onChange,
  children,
  onSubmit,
}) => (
  <>
    <form onSubmit={onSubmit}>
      <select
        style={styles.select}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      {children}
    </form>
  </>
);

export default MenuCategorySelectForm;
