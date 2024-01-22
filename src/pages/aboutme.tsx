import Layout from '@/components/Layout';
import Head from 'next/head';
import styles from './Aboutme.module.scss';

const Aboutme = () => {
  return (
    <Layout>
      <Head>
        <title>sergeyemirzakov - About me</title>
        <link rel='icon' href='/favico.ico' />
      </Head>
      <div className={styles.root}>
        <h1>About Me</h1>
        <p>
          Hi everybody 👋. <br />
          As you may have read, my name is Sergey Emirzakov, I am a frontend developer and
          have been working in the software industry for several years, developing a line
          of business applications in various sectors.
        </p>
        <p>I create products using TypeScript, React and its ecosystem.</p>
        <p>
          Native language is Russian and English at B2 level, I believe in it 😄. In any
          case, there is always room to grow!
        </p>

        <h1>Why did I start this blog?</h1>
        <p>
          The main reason, I think, is to expand my expertise. Because when you write an
          article, you try to explore this topic really deeply.
        </p>
        <p>
          Also it is always cool when your articles help anyone to solve problems or to
          find some usefull stuff.
        </p>
        <p>
          I cannot say that my article are excellent because I guess they do not cover the
          topic 100%. But I am trying! 😄
        </p>

        <h1>Thank you ❤️</h1>
        <p>
          Thanks for visiting my blog, hopefully, you will find a lot usefull information
          here. Be well and have a good day!
        </p>
      </div>
    </Layout>
  );
};

export default Aboutme;
