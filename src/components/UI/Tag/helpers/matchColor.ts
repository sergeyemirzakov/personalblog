export const matchColor = (tagName: string) => {
  const obj = {
    React: '#0A7EA3',
    Typescript: '#3077C6',
    HTML: '#E5532F',
    CSS: '#3D9CD7',
    Redux: '#764ABC',
    Testing: '#289b26',
    SASS: '#C56494',
  } as { [key: string]: string };
  return obj[tagName] || 'white';
};
