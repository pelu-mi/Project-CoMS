export const sortByKey = (array, key) => {
  return array.sort((a, b) => ("" + a[key]).localeCompare(b[key]));
};
