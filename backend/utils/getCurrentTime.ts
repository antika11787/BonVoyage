const getCurrentTime = () => {
  const offset = 6 * 60 * 60 * 1000; // UTC+6 in milliseconds
  return Date.now() + offset;
};

export default getCurrentTime;