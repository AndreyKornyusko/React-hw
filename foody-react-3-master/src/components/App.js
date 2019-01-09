import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import AppHeader from './AppHeader/AppHeader';
import MenuPage from '../pages/Menu';
import MenuItemPage from '../pages/MenuItem';
import MainPage from '../pages/Main';
import AddItemPage from '../pages/AddItem';
import routes from '../configs/routes';

const App = () => (
  <div>
    <AppHeader />

    <Switch>
      <Route exact path={routes.MAIN} component={MainPage} />
      <Route exact path={routes.MENU} component={MenuPage} />
      <Route exact path={routes.ADD_MENU_ITEM} component={AddItemPage} />
      <Route exact path={routes.MENU_ITEM} component={MenuItemPage} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;
