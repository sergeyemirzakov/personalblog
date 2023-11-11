import { ComponentProps } from 'react';
import Input from '../Input';
import styles from './Button.module.scss';

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={styles.root} {...props}>
      {children}
    </button>
  );
};

export default Button;
