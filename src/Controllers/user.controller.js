import { userDAO } from "../DAOS/user.DAO.js";
import { hashed } from "../Utils/hash.utils.js";
import { jwtSign } from "../Utils/jwt.utils.js";
import { userInfos } from "../Utils/user.utils.js";

const register = async (req, res) => {
  const { userName, password, email, role } = req.body;

  const { userByUserName, errorByUserName } = await userDAO.findByUserName(userName);
  if (!!userByUserName)
    return res.status(400).json({ message: "This userName is already taken or is not allowed" });

  const { userByEmail, errorByEmail } = await userDAO.findByEmail(email);
  if (!!userByEmail)
    return res.status(400).json({ message: "This email is already used or is not valid" });

  const { hashedPassword, err } = await hashed(password);
  if (!hashedPassword || !!err) return res.status(400).json({ message: err });

  const { user, error } = await userDAO.register(userName, hashedPassword, email, role);
  if (!!error || !user) return res.status(400).json({ message: error });

  res.status(201).json({ message: "User register successfully", user: userInfos(user) });
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  const { error, user } = await userDAO.login(userName, password);
  if (!!error || !user) return res.status(400).json({ message: error });

  const token = jwtSign(user.id);

  res.status(200).json({ message: "login succesfull", user: userInfos(user), token });
};

const deleteUser = async (req, res) => {
  const { userId } = req.body;
  const { idToDelete } = req.params;

  const { user, error } = await userDAO.deleteUser(userId, idToDelete);
  if (!user || !!error) return res.status(400).json({ message: error });

  res.status(200).json({ message: "User deleted successfully", user: userInfos(user) });
};

export const userController = {
  register,
  login,
  deleteUser,
};
