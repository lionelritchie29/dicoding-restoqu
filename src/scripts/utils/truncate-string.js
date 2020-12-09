const truncateString = (text) => {
  return text.length > 200 ? text.slice(0, 200) + '...' : text;
};

export default truncateString;
