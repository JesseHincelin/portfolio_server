import User from "../Models/user.model.js";

const register = async (userName, password, email, role) => {
  let error = null;
  let user = null;
  const newUser = {
    userName,
    password,
    email,
  };

  try {
    user = await User.create(newUser);
    if (!user) throw new Error("Failed to create new user");
    if (!!role) {
      user.role = role;
    }
    await user.save();
  } catch (e) {
    error = `Could not register : ${e.message}`;
  } finally {
    return { error, user };
  }
};

export const userDAO = {
  register,
};
