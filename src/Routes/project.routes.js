import { Router } from "express";
import { projectController } from "../Controllers/project.controller.js";

const initProjectRoutes = (app, pv, sm, jwt) => {
  const router = Router();
  router.post("/new-project", jwt, sm, projectController.newProject);
  router.patch("/edit-project", jwt, sm, projectController.editProject);
  router.delete("/delete-project/:projectId", jwt, sm, projectController.deleteProject);

  app.use("/message", router);
};

export default initProjectRoutes;
