export const getUserNickname = name => {
  if (name.length < 3) {
    return name;
  }
  const splitted = name.split(" ");

  if (splitted.length < 2) {
    return splitted[0][0];
  }
  return splitted[0][0] + splitted[1][0];
};
