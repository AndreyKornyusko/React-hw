import React, { Component } from 'react';

const INITIAL_STATE = {
  date: '',
  price: '',
  address: '',
  rating: '',
  id: '',
};

export default class OrderHistoryForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = e => {
    let date = new Date();

    this.setState({
      [e.target.name]: e.target.value,
      id: Date.now(),
      date: `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    // console.log('this.state', this.state);

    this.props.onSubmit(this.state);
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { price, address, rating } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="price"
          value={price}
          onChange={this.handleChange}
          placeholder="Enter price"
        />

        <input
          type="text"
          name="address"
          value={address}
          onChange={this.handleChange}
          placeholder="Enter delivery adress"
        />

        <input
          type="text"
          name="rating"
          value={rating}
          onChange={this.handleChange}
          placeholder="Enter rating"
        />

        <button type="submit" onClick={this.handleAddMenuItem}>
          {' '}
          Add order-history item{' '}
        </button>
      </form>
    );
  }
}
