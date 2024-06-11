/**
 * sortByKey - Sort array by key
 * 
 * @param {Array} array - Array to be sorted
 * @param {type} key - Key to use to sort an array
 * @returns Sorted array
 */
export const sortByKey = (array, key) => {
  return array.sort((a, b) => ("" + a[key]).localeCompare(b[key]));
};
