import { Post } from '@/types/post';
import { ChangeEvent, useState } from 'react';

type CountPostsByTag = { [key: string]: number };

export const useFilteredPosts = (posts: Post[]) => {
  const allTags = posts
    .map((tag) => tag.tags)
    .join('_')
    .split('_');
  const uniqueTagsCollection = [...new Set(allTags)];

  const [pickedTags, setPickedTags] = useState<typeof uniqueTagsCollection>([]);
  const [value, setValue] = useState('');

  const filteredPostsByTagName = (tag: string) => {
    setPickedTags((prevState) => [...prevState, tag]);

    if (pickedTags.includes(tag)) {
      const removedTag = pickedTags.filter((pickedTag) => pickedTag !== tag);
      setPickedTags(removedTag);
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const filteredPosts = posts.filter(({ tags }) =>
    pickedTags.find((tag) => tags?.includes(tag)),
  );

  const matchedTag: CountPostsByTag = {};
  const countPostsByTag = [];

  allTags.forEach((tag) => {
    if (tag in matchedTag) {
      return matchedTag[tag]++;
    } else {
      return (matchedTag[tag] = 1);
    }
  });

  for (let key in matchedTag) {
    countPostsByTag.push({
      key: key,
      count: matchedTag[key],
    });
  }

  const showedPosts = filteredPosts.length === 0 ? posts : filteredPosts;
  const renderPosts = showedPosts.filter((item) =>
    item.title.toLowerCase().includes(value.toLowerCase()),
  );

  return {
    filteredPostsByTagName,
    uniqueTagsCollection,
    renderPosts,
    pickedTags,
    countPostsByTag,
    onChangeHandler,
  };
};
