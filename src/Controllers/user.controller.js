import { userDAO } from "../DAOS/user.DAO.js";
import { hashed } from "../Utils/hash.utils.js";
import { jwtSign } from "../Utils/jwt.utils.js";
import { userInfos } from "../Utils/user.utils.js";

const register = async (req, res) => {
  const { userName, password, email, role } = req.body;

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

export const userController = {
  register,
  login,
};
