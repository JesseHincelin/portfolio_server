import { jwtMiddleware } from "../Middlewares/jwt.middleware.js";
import { passwordVerification } from "../Middlewares/passwordVerif.middleware.js";
import { sanitizeMiddleware } from "../Middlewares/sanitize.middleware.js";
import initMessageRoutes from "./message.routes.js";
import initProjectRoutes from "./project.routes.js";
import initUserRoutes from "./user.routes.js";

const initRoutes = (app) => {
  initUserRoutes(app, passwordVerification, sanitizeMiddleware, jwtMiddleware);
  initMessageRoutes(app, passwordVerification, sanitizeMiddleware, jwtMiddleware);
  initProjectRoutes(app, passwordVerification, sanitizeMiddleware, jwtMiddleware);
};

export default initRoutes;
