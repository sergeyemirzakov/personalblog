import { format, parseISO } from 'date-fns';
import React, { ComponentProps } from 'react';
import styles from './Date.module.scss'

interface DateProps extends ComponentProps<'time'> {
  postDate: string;
}

const Date: React.FC<DateProps> = ({ postDate, ...props }) => {
  const date = parseISO(postDate);
  const createdAt = date.toLocaleDateString('en-us', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <time className={styles.root} {...props} dateTime={postDate}>
      {createdAt}, {format(date, 'yyyy')}
    </time>
  );
};

export default Date;
