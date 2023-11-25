import styles from './Tag.module.scss';
import React from 'react';
import { matchColor } from './helpers/matchColor';

interface TagProps {
  tagName: string;
}

const Tag = ({ tagName }: TagProps) => {
  return (
    <span style={{ backgroundColor: matchColor(tagName) }} className={styles.root}>
      {tagName}
    </span>
  );
};

export default Tag;
