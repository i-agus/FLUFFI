import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <img src="/images/icons/logo.png" alt="Not Found" style={styles.image} />
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', padding: '2rem' },
  image: { width: '300px', marginTop: '1rem' }
};

export default NotFound;
