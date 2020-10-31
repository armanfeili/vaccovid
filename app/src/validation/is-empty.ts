export const isEmpty = (value: undefined | null | string | object) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  ); // if one the things above was right, true returns.
};

// module.exports = isEmpty;
