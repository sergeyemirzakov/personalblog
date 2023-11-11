import React from 'react';

import styles from './Container.module.scss';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className={styles.root}>{children}</div>
);

export default Container;
