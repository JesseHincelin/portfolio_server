import { passwordIsValid } from "../Utils/regex.utils.js";

export const passwordVerification = (req, res, next) => {
  const { password } = req.body;
  if (!passwordIsValid(password)) return res.status(401).json({ message: "Password not valid" });

  next();
};
