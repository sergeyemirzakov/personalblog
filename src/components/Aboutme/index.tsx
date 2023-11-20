import Link from 'next/link';
import CustomLink from '../UI/CustomLink';
import styles from './Aboutme.module.scss';

const Aboutme = () => {
  return (
    <section className={styles.root}>
      <p>
        This is my blog page and here I am trying to share all my knowledge about what I
        have learned or what I find interesting. If you have any feedback or suggestions,
        you can find me on{' '}
        <CustomLink href='https://www.linkedin.com/in/seem16/' target='_blank'>
          LinkedIn
        </CustomLink>
        .
      </p>
      <p>
        If you want to get more details you can go to the{' '}
        <CustomLink href='/aboutme'>About me</CustomLink>.
      </p>
    </section>
  );
};

export default Aboutme;
