import React from 'react';

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    maxWidth: 600,
    minHeight: 100,
    backgroundColor: '#fff',
    padding: 16,
  },
};

const Loading = () => (
  <div style={styles.backdrop}>
    <h1 style={styles.loading}>Loading ...</h1>
  </div>
);

export default Loading;
