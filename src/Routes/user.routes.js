import { Router } from "express";
import { userController } from "../Controllers/user.controller.js";

const initUserRoutes = (app, sm, jwt) => {
  const router = Router();
  // router.post("/register", sm, userController.register);
  // router.post("/login", sm, userController.login);
  // router.delete("/delete-account/:password", jwt, sm, userController.deleteAccount);

  app.use("/user", router);
};

export default initUserRoutes;
