export const userInfos = (user) => {
  const formatedUser = {
    id: user._id,
    userName: user.userName,
    email: user.email,
    clockIn: user.clockIn,
    clockingLog: user.clockingLog,
    subTask: user.subTask,
  };
  return formatedUser;
};
