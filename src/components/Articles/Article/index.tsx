import Date from '@/components/UI/Date';
import Tag from '@/components/UI/Tag';
import Link from 'next/link';
import styles from './Article.module.scss';
import React from 'react';

interface ArticleProps {
  id: string;
  title: string;
  date: string;
  tags?: string;
  shortDescription: string;
}

const Article = ({ title, date, tags, shortDescription, id }: ArticleProps) => {
  const arrayFromTags = tags?.split('_');

  return (
    <article className={styles.root}>
      <Link href={`/${id}`}>
        <Date postDate={date} />
        <h1>{title}</h1>
        <p>{shortDescription}</p>
        <div className={styles.footer}>
          <div className={styles.tags}>
            {arrayFromTags?.map((tag) => (
              <Tag key={tag} tagName={tag} />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Article;
