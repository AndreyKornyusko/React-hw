import React, { Component } from 'react';
import MenuGrid from './MenuGridView';
import Loader from '../../components/Loader';
import MenuCategorySelectForm from './MenuCategorySelector';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import routes from '../../configs/routes';
import MenuSelectFormReset from './MenuSelectFormReset';

import * as API from '../../services/api';

const styles = {
  activeLink: {
    color: 'palevioletred',
    textDecoration: 'none',
  },
};

const getCategoryFromProps = props =>
  queryString.parse(props.location.search).category;

class MenuGridContainer extends Component {
  state = {
    menu: [],
    loading: false,
    error: null,
    categories: [],
    isCategoryChanged: false,
  };

  componentDidMount() {
    API.getCategories()
      .then(data => data.map(item => item.name))
      .then(categories => this.setState({ categories }));

    const category = getCategoryFromProps(this.props);

    this.setState({ loading: true });

    if (!category) {
      return API.getAllMenuItems()
        .then(menu => this.setState({ menu, loading: false }))
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }

    this.getCategories(category);
  }

  componentDidUpdate(prevProps) {
    const prevCategory = getCategoryFromProps(prevProps);
    const nextCategory = getCategoryFromProps(this.props);

    if (prevCategory === nextCategory) return;

    this.getCategories(nextCategory);

    this.setState({ isCategoryChanged: !this.state.isCategoryChanged });
  }

  getCategories = category => {
    this.setState({ loading: true });

    API.getMenuItemsWithCategory(category)
      .then(menu => this.setState({ menu, loading: false }))
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleCategoryChange = category => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `category=${category}`,
    });
  };

  handleResetFormFilter = e => {
    e.preventDefault();

    this.setState({ loading: true });

    API.getAllMenuItems()
      .then(menu => {
        const { history, location } = this.props;
        history.push({
          pathname: location.pathname,
          search: '',
        });

        // console.log('menu',menu);
        this.setState({ menu, loading: false, isCategoryChanged: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    const currentCategory = getCategoryFromProps(this.props);

    const { menu, loading, error, categories, isCategoryChanged } = this.state;

    return (
      <div>
        <NavLink
          exact
          to={routes.ADD_MENU_ITEM}
          activeStyle={styles.activeLink}
        >
          Добавить элемент меню
        </NavLink>

        {
          <MenuCategorySelectForm
            options={categories}
            value={currentCategory}
            onChange={this.handleCategoryChange}
          >
            {isCategoryChanged && (
              <MenuSelectFormReset
                categor={currentCategory}
                Submit={this.handleResetFormFilter}
              />
            )}
          </MenuCategorySelectForm>
        }

        {loading && <Loader />}
        {error && <h1>Error</h1>}
        {menu.length > 0 && <MenuGrid items={menu} />}
      </div>
    );
  }
}

export default withRouter(MenuGridContainer);
