/**
 * getRandomImageUrl - Get a random image url
 * 
 * @param {int} id - ID of object to use
 * @param {int} width - Width of image
 * @param {int} height - Height of image
 * @returns 
 */
export const getRandomImageUrl = (id, width, height) => {
  const randomId = parseInt(id, 16) % 85;

  return `https://picsum.photos/id/${randomId}/${width}/${height}`;
};
