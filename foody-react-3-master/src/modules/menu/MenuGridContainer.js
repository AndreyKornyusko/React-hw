import React, { Component } from 'react';
import MenuGrid from './MenuGridView';
import Loader from '../../components/Loader';
import MenuCategorySelectForm from './MenuCategorySelector';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import MenuSelectFormReset from './MenuSelectFormReset';

import { connect } from 'react-redux';

import { asyncOperation, menuSelectors } from '../../redux/menu';
import { cartActions } from '../../redux/cart';
import actionMenu from '../../redux/menu/actionMenu';

const getCategoryFromProps = props =>
  queryString.parse(props.location.search).category;

class MenuGridContainer extends Component {
  state = {
    isCategoryChanged: false,
  };

  componentDidMount() {
    this.props.getCategory();

    const category = getCategoryFromProps(this.props);

    if (!category) {
      return this.props.getMenu();
    }

    this.getCategories(category);
  }

  componentDidUpdate(prevProps) {
    const prevCategory = getCategoryFromProps(prevProps);
    const nextCategory = getCategoryFromProps(this.props);

    if (prevCategory === nextCategory) return;

    this.getCategories(nextCategory);

    if (!this.state.isCategoryChanged) {
      this.props.getMenu();
    }
  }

  getCategories = category => {
    this.props.getItemByCategory(category);
  };

  handleCategoryChange = category => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `category=${category}`,
    });

    this.setState({ isCategoryChanged: true });
  };

  handleResetFormFilter = e => {
    e.preventDefault();
    this.setState({ isCategoryChanged: false });

    const { history, location } = this.props;
    history.push({
      pathname: location.pathname,
      search: '',
    });
  };

  render() {
    const { menuList, menuCategories, addToCart, error } = this.props;
    const currentCategory = getCategoryFromProps(this.props);
    const { loading, isCategoryChanged } = this.state;

    // console.log('menuList', menuList);
    // console.log('this.props.state', this.props.state);

    return (
      <div>
        {
          <MenuCategorySelectForm
            options={menuCategories}
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

        {/* {loading && <Loader />} */}
        {/* {error && <h1>Error</h1>} */}
        {menuList.length > 0 && (
          <MenuGrid items={menuList} addToCart={addToCart} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menuList: menuSelectors.getMenu(state),
  menuCategories: menuSelectors.getFoodCategories(state),
  // state: state,
});

const mapDispatchToProps = {
  getMenu: asyncOperation.fetchMenuItems,
  getCategory: asyncOperation.fetchFoodCategories,
  getItemByCategory: asyncOperation.fetchMenuItemsWithCategory,
  addToCart: cartActions.addToCart,
  error: actionMenu.fetchError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MenuGridContainer));
