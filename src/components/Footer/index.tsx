import React, { useEffect, useState } from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className={styles.root}>
      <span>Sergey Emirzakov</span>
      <span>2021 - {currentYear}</span>
    </footer>
  );
};

export default Footer;
