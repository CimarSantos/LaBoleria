import { Router } from "express";
import { schemas } from "../schemas/schemas.js";
import { postClient } from "../controllers/clientsController.js";

import schemaValidator from "../middlewares/schemaValidator.js";

const clientsRouter = Router();

clientsRouter.post(
  "/clients",
  schemaValidator(schemas.clientsSchema),
  postClient
);

export default clientsRouter;
