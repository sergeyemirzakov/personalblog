import classNames from 'classnames';
import styles from './FilteringTags.module.scss';

interface FilteringTagsProps {
  filteredPostsByTagName: (tag: string) => void;
  pickedTags: string[];
  countPostsByTag: {
    key: string;
    count: number;
  }[];
}

const FilteringTags = ({
  filteredPostsByTagName,
  countPostsByTag,
  pickedTags,
}: FilteringTagsProps) => {
  return (
    <div className={styles.root}>
      {countPostsByTag?.map(({ key, count }) => (
        <div
          role='button'
          className={classNames(styles.tag, {
            [styles.active]: pickedTags.includes(key),
          })}
          onClick={() => filteredPostsByTagName(key)}
          key={key}
        >
          <div>{key}</div>
          <div>{count}</div>
        </div>
      ))}
    </div>
  );
};

export default FilteringTags;
