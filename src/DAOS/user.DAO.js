import Project from "../Models/project.model.js";
import User, { ROLE } from "../Models/user.model.js";
import { compareHash } from "../Utils/hash.utils.js";

const findByUserName = async (userName) => {
  let errorByUserName = null;
  let userByUserName = null;

  try {
    userByUserName = await User.findOne({ userName: userName });
  } catch (e) {
    errorByUserName = `Could not find user with this username : ${e.message}`;
  } finally {
    return { errorByUserName, userByUserName };
  }
};

const findByEmail = async (email) => {
  let errorByEmail = null;
  let userByEmail = null;

  try {
    userByEmail = await User.findOne({ email: email });
  } catch (e) {
    errorByEmail = `Could not find user with this email : ${e.message}`;
  } finally {
    return { errorByEmail, userByEmail };
  }
};

const findById = async (userId) => {
  let errorById = null;
  let userById = null;

  try {
    userById = await User.findById(userId);
    if (!userById) throw new Error("Could not find user");
  } catch (e) {
    errorById = `Could not find user with this Id : ${e.message}`;
  } finally {
    return { userById, errorById };
  }
};

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

const login = async (userName, password) => {
  let error = null;
  let user = null;

  try {
    user = await User.findOne({ userName: userName }).populate({ path: "projects" });
    if (!user) throw new Error("Could not find this user");
    const { match, errorMatch } = await compareHash(password, user.password);
    if (!match || !!errorMatch) throw new Error(errorMatch);
  } catch (e) {
    error = `Could not login : ${e.message}`;
  } finally {
    return { error, user };
  }
};

const deleteUser = async (userId, idToDelete) => {
  let error = null;
  let user = null;

  try {
    user = await User.findById(userId);
    if (!user || user.role !== ROLE.ADMIN) throw new Error("You don't have the rights to proceed");
    const userToDelete = await User.findById(idToDelete);
    for (let i = 0; i < userToDelete.projects.length; i++) {
      await Project.deleteOne({ _id: userToDelete.projects[i] });
    }
    await User.deleteOne({ _id: idToDelete });
  } catch (e) {
    error = `Could not delete the user : ${e.message}`;
  } finally {
    return { user, error };
  }
};

export const userDAO = {
  findByUserName,
  findByEmail,
  findById,
  register,
  login,
  deleteUser,
};
