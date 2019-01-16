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
  Submit,
  categor,
}) => (
  <>
    <div>
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
    </div>
  </>
);

export default MenuCategorySelectForm;
