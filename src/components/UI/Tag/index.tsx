import styles from './Tag.module.scss';
import React from 'react';

interface TagProps {
  tagName: string;
}

const Tag = ({ tagName }: TagProps) => {
  const matchColor = () => {
    switch (tagName) {
      case 'React': {
        return '#0A7EA3';
      }
      case 'Typescript': {
        return '#3077C6';
      }
      case 'HTML': {
        return '#E5532F';
      }
      case 'CSS': {
        return '#3D9CD7';
      }
      case 'Redux': {
        return '#764ABC';
      }
      case 'Testing': {
        return '#289b26';
      }
      default: {
        return 'white';
      }
    }
  };

  return (
    <span style={{ backgroundColor: matchColor() }} className={styles.root}>
      {tagName}
    </span>
  );
};

export default Tag;
