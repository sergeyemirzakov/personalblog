import React from 'react';

import styles from './Title.module.scss';

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => (
  <h1 className={styles.root}>{children}</h1>
);

export default Title;
