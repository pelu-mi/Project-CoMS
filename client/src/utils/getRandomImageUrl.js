export const getRandomImageUrl = (id, width, height) => {
  const randomId = parseInt(id, 16) % 85;

  return `https://picsum.photos/id/${randomId}/${width}/${height}`;
};
