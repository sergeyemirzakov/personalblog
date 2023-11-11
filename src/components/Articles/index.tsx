import { Post } from '@/types/post';
import Article from './Article';

import styles from './Articles.module.scss';

interface PostsData {
  posts?: Post[];
}

const Articles = ({ posts }: PostsData) => {
  return (
    <section className={styles.root}>
      {posts?.map((post) => (
        <Article
          id={post.id}
          key={post.id}
          title={post.title}
          date={post.date}
          tags={post.tags}
          shortDescription={post.shortDescription}
        />
      ))}
    </section>
  );
};

export default Articles;
