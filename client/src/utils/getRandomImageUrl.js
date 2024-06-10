export const getRandomImageUrl = (id, width, height) => {
  const randomId = parseInt(id, 16) % 1000;

  return `https://picsum.photos/id/${randomId}/${width}/${height}`;
};
