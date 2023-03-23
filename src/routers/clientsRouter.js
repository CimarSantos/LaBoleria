import { Router } from "express";
import { schemas } from "../schemas/schemas.js";
import {
  postClient,
  getClientsOrdersByClientId,
} from "../controllers/clientsController.js";

import schemaValidator from "../middlewares/schemaValidator.js";

const clientsRouter = Router();

clientsRouter.post(
  "/clients",
  schemaValidator(schemas.clientsSchema),
  postClient
);
clientsRouter.get("/clients/:id/orders", getClientsOrdersByClientId);

export default clientsRouter;
