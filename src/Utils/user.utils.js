export const userInfos = (user) => {
  const formatedUser = {
    id: user._id,
    userName: user.userName,
    email: user.email,
    role: user.role,
    projects: user.projects,
  };
  return formatedUser;
};
