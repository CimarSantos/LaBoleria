import { Router } from "express";
import { schemas } from "../schemas/schemas.js";
import { postClient, getClient } from "../controllers/clientsController.js";

import schemaValidator from "../middlewares/schemaValidator.js";

const clientsRouter = Router();

clientsRouter.post(
  "/clients",
  schemaValidator(schemas.clientsSchema),
  postClient
);
clientsRouter.get("/clients/:id/orders", getClient);

export default clientsRouter;
