import classNames from 'classnames';
import styles from './Switch.module.scss';
import React from "react";

interface SwitchProps {
  colorMode: string;
}

const Switch: React.FC<SwitchProps> = ({ colorMode }) => {
  if (!colorMode) return null;

  return (
    <div aria-hidden="true" className={styles.root}>
      <input readOnly type='checkbox' checked={colorMode !== 'light'} />
      <span className={classNames(styles.slider, styles.round)} />
    </div>
  );
};

export default Switch;
