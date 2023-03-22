import { Router } from "express";
import { schemas } from "../schemas/schemas.js";
import {
  postOrder,
  getOrders,
  getOrdersById,
} from "../controllers/ordersController.js";

import schemaValidator from "../middlewares/schemaValidator.js";

const ordersRouter = Router();

ordersRouter.post("/orders", schemaValidator(schemas.ordersSchema), postOrder);
ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrdersById);


export default ordersRouter;
