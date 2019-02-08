import React, { Component } from 'react';
import MenuItem from './MenuItemView';
import { withRouter } from 'react-router-dom';
import CommentForm from './MenucommentFormView';
import CommentsList from './MenuCommentsList';
import { connect } from 'react-redux';
import routes from '../../configs/routes';

import { asyncOperation, menuSelectors } from '../../redux/menu';

const INITIAL_STATE = {
  text: '',
};

class MenuItemContainer extends Component {
  state = {
    category: null,
    text: '',
    notes: [],
  };

  componentDidMount() {
    this.props.getItemById(this.props.match.params.id);
  }

  handleGoBackToMenu = () => {
    const { history, location } = this.props;

    if (location.state) {
      return history.push(location.state.from);
    }

    return history.push(routes.MENU);
  };

  handleCommentToItem = e => {
    e.preventDefault();
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
      notes: [{ id: Date.now(), text }, ...prevState.notes],
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
    } = this.props.menuItem;

    const { text, notes } = this.state;

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
            text={text}
          />
          <CommentsList notes={notes} />
        </MenuItem>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menuItem: menuSelectors.getItemById(state),
  // state: state,
});
const mapDispatchToProps = {
  getItemById: asyncOperation.fetchMenuItemsById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MenuItemContainer));
