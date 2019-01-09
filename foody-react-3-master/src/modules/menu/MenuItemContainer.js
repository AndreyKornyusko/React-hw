import React, { Component } from 'react';
import MenuItem from './MenuItemView';
import Loader from '../../components/Loader';
import CategorySelector from './MenuCategorySelector';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import CommentForm from './MenucommentFormView';
import CommentsList from './MenuCommentsList';

import * as API from '../../services/api';

const INITIAL_STATE = {
  text: '',
};

class MenuItemContainer extends Component {
  state = {
    id: null,
    name: null,
    image: null,
    price: null,
    ingredients: null,
    description: null,
    category: null,
    comment: '',
    text: '',
    notes: [],
  };

  componentDidMount() {
    API.getMenuItemById(this.props.id).then(item => this.setState({ ...item }));
  }

  handleGoBackToMenu = () => {
    const { history, location } = this.props;
    const { category } = this.state;

    if (location.state) {
      return history.push(location.state.from);
    }

    return history.push({
      pathname: '/menu',
      search: `?category=${category}`,
    });
  };

  handleCommentToItem = e => {
    // console.log('e.target.name: ', e.target.name);
    // console.log('e.target.value: ', e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addCommentToItem = e => {
    e.preventDefault();

    this.handleAddNote(this.state.text);
    this.setState({ ...INITIAL_STATE });
  };

  handleAddNote = text => {
    this.setState(prevState => ({
      notes: [{ text }, ...prevState.notes],
    }));
  };

  render() {
    const { id } = this.props;
    const {
      name,
      description,
      ingredients,
      price,
      image,
      comment,
      text,
      notes,
    } = this.state;

    return (
      <div>
        <MenuItem
          id={id}
          name={name}
          image={image}
          price={price}
          ingredients={ingredients}
          description={description}
          goBackToMenu={this.handleGoBackToMenu}
        >
          <CommentForm
            addComment={this.addCommentToItem}
            handleChange={this.handleCommentToItem}
            text={comment}
          />
          <CommentsList notes={this.state.notes} />
        </MenuItem>
      </div>
    );
  }
}

export default withRouter(MenuItemContainer);
