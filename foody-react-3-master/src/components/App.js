import React, { Component } from 'react';
import AppHeader from './AppHeader';
import Modal from './Modal';
import OrderHistory from './OrderHistory';
import * as API from '../services/api';
import OrderHistoryInfoModal from './OrderHistoryInfoModal';
import OrderHistoryForm from './OrderHistoryForm';
import Loading from './Loading';

export default class App extends Component {
  state = {
    isModalOpen: false,
    isHistoryModalOpen: false,
    history: [],
    info: '',
    isInfoLoading: false,
    isLoading: false,
    error: null,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  openHistoryModal = () => {
    this.setState({ isHistoryModalOpen: true });
  };

  closeHistoryModal = () => {
    this.setState({ isHistoryModalOpen: false });
  };

  componentDidMount() {
    API.getAllOrderHistoryItems()
      .then(history => {
        this.setState({ history });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleDeleteItem = id => {
    API.deleteOrderHistoryItem(id)
      .then(isOk => {
        if (!isOk) return;

        this.setState(state => ({
          history: state.history.filter(item => item.id !== id),
        }));
      })
      .catch(error => this.setState({ error, isLoading: false }));
  };

  handleShowMoreInfo = id => {
    this.setState({ isLoading: true });
    API.getOrderHistoryById(id)
      .then(item => {
        this.setState({ info: JSON.stringify(item), isLoading: false });
        // console.log('this.state', this.state);
        this.openHistoryModal();
      })
      .catch(error => this.setState({ error, isLoading: false }));
  };

  handleAddOrderHistoryItem = state => {
    API.addOrderHistoryItem(state).then(newItem => {
      this.setState(state => ({
        history: [...state.history, newItem],
      }));
    });
  };

  render() {
    const { isModalOpen, isHistoryModalOpen, isLoading } = this.state;

    return (
      <div>
        <AppHeader />
        <button type="button" onClick={this.openModal}>
          Open Modal
        </button>
        {isModalOpen && <Modal onClose={this.closeModal} />}

        <OrderHistoryForm onSubmit={this.handleAddOrderHistoryItem} />

        <OrderHistory
          items={this.state.history}
          onDelete={this.handleDeleteItem}
          onShowMoreInfo={this.handleShowMoreInfo}
        />

        {isLoading ? (
          <Loading />
        ) : (
          isHistoryModalOpen && (
            <OrderHistoryInfoModal
              onClose={this.closeHistoryModal}
              info={this.state.info}
            />
          )
        )}
      </div>
    );
  }
}
