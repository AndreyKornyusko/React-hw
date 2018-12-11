import React, { Component, createRef } from 'react';

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    maxWidth: 600,
    minHeight: 300,
    backgroundColor: '#fff',
    padding: 16,
  },
};

export default class OrderHistoryInfoModal extends Component {
  BackdropRef = createRef();
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    console.log('e.code', e.code);
    if (e.code !== 'Escape') return;
    this.props.onClose();
  };

  handleBackdropClick = e => {
    if (e.target !== this.BackdropRef.current) return;
    this.props.onClose();
  };
  render() {
    const { onClose, info } = this.props;
    return (
      <div
        style={styles.backdrop}
        className="Backdrop"
        ref={this.BackdropRef}
        onClick={this.handleBackdropClick}
      >
        <div className="ModalWindow" style={styles.modal}>
          <p>{info}</p>

          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}
