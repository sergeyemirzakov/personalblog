import React from 'react';

import styles from './Input.module.scss';

interface InputProps extends React.ComponentProps<'input'> {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, ...props }) => {
  return (
    <input {...props} className={styles.root} type='text' placeholder={placeholder} />
  );
};

export default Input;
