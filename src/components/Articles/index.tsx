import { Post } from '@/types/post';
import { useState } from 'react';
import Input from '../UI/Input';
import Article from './Article';

import styles from './Articles.module.scss';
import FilteringTags from './FilteringTags';
import { useFilteredPosts } from './hooks/useFilteredPosts';

interface PostsData {
  posts: Post[];
}

const Articles = ({ posts }: PostsData) => {
  const {
    filteredPostsByTagName,
    renderPosts,
    pickedTags,
    countPostsByTag,
    onChangeHandler,
  } = useFilteredPosts(posts);

  return (
    <section className={styles.root}>
      <Input placeholder='Search...' onChange={onChangeHandler} />
      <FilteringTags
        filteredPostsByTagName={filteredPostsByTagName}
        pickedTags={pickedTags}
        countPostsByTag={countPostsByTag}
      />
      {renderPosts.map((post) => (
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
