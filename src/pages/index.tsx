import Head from 'next/head';
import Aboutme from '@/components/Aboutme';
import Articles from '@/components/Articles';
import { getSortedPostsData } from '@/lib/posts';
import { PostsData } from '@/types/post';
import Layout from '@/components/Layout';

const Home = ({ posts }: PostsData) => {
  return (
    <>
      <Head>
        <title>sergeyemirzakov</title>
        <meta
          name='description'
          content='Hello, my name is Sergey. I am a front-end developer. Here I am trying to share all my knowledge about what I have learned or what I find interesting'
        />
        <meta name='author' content='Sergey Emirzakov' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favico.ico' />
      </Head>
      <Layout>
        <Aboutme />
        <Articles posts={posts} />
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps = async () => ({
  props: { posts: getSortedPostsData() },
});
