import React from 'react';

import styles from './Input.module.scss';

interface InputProps extends React.ComponentProps<'input'> {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, ...props }) => {
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z' />
        </svg>
      </div>
      <input {...props} className={styles.input} type='text' placeholder={placeholder} />
    </div>
  );
};

export default Input;
