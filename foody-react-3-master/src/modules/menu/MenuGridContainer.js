import React, { Component } from 'react';
import MenuGrid from './MenuGridView';
import Loader from '../../components/Loader';
import MenuCategorySelectForm from './MenuCategorySelector';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import routes from '../../configs/routes';
import MenuSelectFormReset from './MenuSelectFormReset';

import { connect } from 'react-redux';

import { asyncOperation, menuSelectors } from '../../redux/menu';

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
    // this.props.getCategory();
    API.getCategories()
      .then(data => data.map(item => item.name))
      .then(categories => this.setState({ categories }));

    const category = getCategoryFromProps(this.props);

    // this.setState({ loading: true });

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
      API.getAllMenuItems()
        .then(menu => {
          this.setState({ menu, loading: false });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }
  }

  getCategories = category => {
    // this.setState({ loading: true });

    this.props.getItemByCategory(category);
    // .then(menu => this.setState({ menu, loading: false }))
    // .catch(error => {
    //   this.setState({ error, loading: false });
    // });
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
    const { menuList, menuCategories } = this.props;
    const currentCategory = getCategoryFromProps(this.props);
    console.log('currentCategory', currentCategory);
    console.log('menuCategories in render', menuCategories);

    const { menu, loading, error, categories, isCategoryChanged } = this.state;
    console.log('state categories', categories);
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
        {menuList.length > 0 && <MenuGrid items={menuList} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menuList: menuSelectors.getMenu(state),
  menuCategories: menuSelectors.getFoodCategories(state),
});

const mapDispatchToProps = {
  getMenu: asyncOperation.fetchMenuItems,
  getCategory: asyncOperation.fetchFoodCategories,
  getItemByCategory: asyncOperation.fetchMenuItemsWithCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MenuGridContainer));

// const styles = {
//   activeLink: {
//     color: 'palevioletred',
//     textDecoration: 'none',
//   },
// };

// const getCategoryFromProps = props =>
//   queryString.parse(props.location.search).category;

// class MenuGridContainer extends Component {
//   state = {
//     menu: [],
//     loading: false,
//     error: null,
//     categories: [],
//     isCategoryChanged: false,
//   };

//   componentDidMount() {
//     API.getCategories()
//       .then(data => data.map(item => item.name))
//       .then(categories => this.setState({ categories }));

//     const category = getCategoryFromProps(this.props);

//     this.setState({ loading: true });

//     if (!category) {
//       return API.getAllMenuItems()
//         .then(menu => this.setState({ menu, loading: false }))
//         .catch(error => {
//           this.setState({ error, loading: false });
//         });
//     }

//     this.getCategories(category);
//   }

//   componentDidUpdate(prevProps) {
//     const prevCategory = getCategoryFromProps(prevProps);
//     const nextCategory = getCategoryFromProps(this.props);

//     if (prevCategory === nextCategory) return;

//     this.getCategories(nextCategory);

//     if (!this.state.isCategoryChanged) {
//       API.getAllMenuItems()
//         .then(menu => {
//           this.setState({ menu, loading: false });
//         })
//         .catch(error => {
//           this.setState({ error, loading: false });
//         });
//     }
//   }

//   getCategories = category => {
//     this.setState({ loading: true });

//     API.getMenuItemsWithCategory(category)
//       .then(menu => this.setState({ menu, loading: false }))
//       .catch(error => {
//         this.setState({ error, loading: false });
//       });
//   };

//   handleCategoryChange = category => {
//     this.props.history.push({
//       pathname: this.props.location.pathname,
//       search: `category=${category}`,
//     });

//     this.setState({ isCategoryChanged: true });
//   };

//   handleResetFormFilter = e => {
//     e.preventDefault();
//     this.setState({ isCategoryChanged: false });

//     const { history, location } = this.props;
//     history.push({
//       pathname: location.pathname,
//       search: '',
//     });
//   };

//   render() {
//     const currentCategory = getCategoryFromProps(this.props);

//     const { menu, loading, error, categories, isCategoryChanged } = this.state;

//     return (
//       <div>
//         <NavLink
//           exact
//           to={routes.ADD_MENU_ITEM}
//           activeStyle={styles.activeLink}
//         >
//           Добавить элемент меню
//         </NavLink>

//         {
//           <MenuCategorySelectForm
//             options={categories}
//             value={currentCategory}
//             onChange={this.handleCategoryChange}
//           >
//             {isCategoryChanged && (
//               <MenuSelectFormReset
//                 categor={currentCategory}
//                 Submit={this.handleResetFormFilter}
//               />
//             )}
//           </MenuCategorySelectForm>
//         }

//         {loading && <Loader />}
//         {error && <h1>Error</h1>}
//         {menu.length > 0 && <MenuGrid items={menu} />}
//       </div>
//     );
//   }
// }

// export default withRouter(MenuGridContainer);
