import express from "express";
import initRoutes from "./Routes/routes.js";
import initMiddlewares from "./Middlewares/init.middleware.js";
import initDb from "./Config/database.config.js";

const app = express();
const PORT = process.env.PORT;

await initDb();
initMiddlewares(app);
initRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
