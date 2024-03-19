import { jwtMiddleware } from "../Middlewares/jwt.middleware.js";
import { sanitizeMiddleware } from "../Middlewares/sanitize.middleware.js";
import initUserRoutes from "./user.routes.js";

const initRoutes = (app) => {
  initUserRoutes(app, sanitizeMiddleware, jwtMiddleware);
};

export default initRoutes;
