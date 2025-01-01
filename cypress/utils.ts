export const generateRandomString = () => {
  const randomName = Math.random().toString(36).substring(7);

  return randomName;
};
