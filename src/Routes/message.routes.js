import { Router } from "express";
import { messageController } from "../Controllers/message.controller.js";

const initMessageRoutes = (app, pv, sm, jwt) => {
  const router = Router();
  router.post("/new-message", sm, messageController.newMessage);
  router.get("/get-messages", jwt, sm, messageController.getMessages);
  router.delete("/delete-message/:messageId", jwt, sm, messageController.deleteMessage);

  app.use("/message", router);
};

export default initMessageRoutes;
