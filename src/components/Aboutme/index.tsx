import styles from './Aboutme.module.scss';
import CustomLink from '@/components/UI/CustomLink';

const Aboutme = () => {
  return (
    <section className={styles.root}>
      <p>
        Hello, as you may have read, my name is Sergey Emirzakov. I am a frontend
        developer and have been working in the software industry for several years,
        developing a line of business applications in various sectors.
      </p>
      <p>
        This is my blog page and here I am trying to share all my knowledge about what I
        have learned or what I find interesting. If you have any feedback or suggestions,
        you can find me on{' '}
        <CustomLink href='https://www.linkedin.com/in/seem16/' target='_blank'>
          LinkedIn
        </CustomLink>
        .
      </p>
    </section>
  );
};

export default Aboutme;
