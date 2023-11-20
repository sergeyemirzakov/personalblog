import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className={styles.root}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span>Sergey Emirzakov</span>
      </div>
      <span>2022 - {currentYear}</span>
    </footer>
  );
};

export default Footer;
