import Date from '@/components/UI/Date';
import Layout from '@/components/Layout';
import { getAllPostIds, getPostData } from '@/lib/posts';
import Head from 'next/head';
import styles from './Post.module.scss';

import ButtonLink from "@/components/UI/ButtonLink/ButtonLink";

interface PostDataProps {
  postData: {
    title: string;
    date: string;
    img?: string;
    tags?: string;
    contentHtml: string;
  };
}

export default function Post({ postData }: PostDataProps) {
  return (
    <Layout>
      <Head>
        <title>{`sergeyemirzakov - ${postData.title}`}</title>
        <link rel='icon' href='/favico.ico' />
      </Head>
      <div className={styles.root}>
        <div className={styles.header}>
          <Date className={styles.date} postDate={postData.date} />
          <h1 className={styles.title}>{postData.title}</h1>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths = async () => ({
  paths: getAllPostIds(),
  fallback: false,
});

type getStaticPropsType = {
  params: {
    id: string;
  };
};

export const getStaticProps = async ({ params }: getStaticPropsType) => ({
  props: {
    postData: await getPostData(params.id),
  },
});
