import React from 'react';
import Link from 'next/link';

import Image from 'next/image';
import photo from '@/assets/photo/photo.jpg';

import { ThemeContext as theme } from '@/context/themeContext';
import Switch from '@/components/UI/Switch';

import sound from '@/assets/sounds/toggler.mp3';

import styles from './Header.module.scss';
import { useRouter } from 'next/router';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import CustomLink from '../UI/CustomLink';

const Header = () => {
  const { colorMode, setColorMode } = React.useContext(theme);

  const { pathname } = useRouter();

  const onColorModeHandler = () => {
    if (colorMode === 'light') {
      setColorMode('dark');
    } else setColorMode('light');
    new Audio(sound).play().catch();
  };

  return (
    <header className={styles.root}>
      <Link className={styles.logo} href='/'>
        <Image className={styles.photo} src={photo} alt='Photo of the author' />
        <span className={styles.wrapper}>
          <span className={styles.supHeader}>Front-end developer</span>
          <span className={styles.title}>
            {pathname === '/' ? 'Sergey Emirzakov' : '← Back to home'}
          </span>
        </span>
      </Link>
      <button onClick={onColorModeHandler} className={styles.themeToggler}>
        <Switch colorMode={colorMode} />
      </button>
    </header>
  );
};

export default Header;
