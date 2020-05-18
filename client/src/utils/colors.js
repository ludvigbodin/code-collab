const colors = ["red", "blue", "green", "orange", "purple", "pink"];

export const assignColorToUsers = users => {
  return users.map((user, index) => {
    return {
      ...user,
      color: colors[index]
    };
  });
};
