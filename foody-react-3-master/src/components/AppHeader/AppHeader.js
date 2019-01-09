import React from 'react';

import Navigation from '../Navigation/Navigation';

import navItems from '../../configs/main-nav';

import s from './AppHeader.module.css';

const AppHeader = () => (
  <header className={s.header}>
    <Navigation items={navItems} />
  </header>
);

export default AppHeader;
