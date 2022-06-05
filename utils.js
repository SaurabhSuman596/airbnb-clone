export const isMultiple = (value) => {
  console.log(value);
  if (value === 0 || value > 1) {
    return 's';
  } else {
    return ' ';
  }
};
