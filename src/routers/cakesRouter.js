import { Router } from "express";
import { schemas } from "../schemas/schemas.js";
import { postCake } from "../controllers/cakesController.js";

import schemaValidator from "../middlewares/schemaValidator.js";

const cakesRouter = Router();

cakesRouter.post("/cakes", schemaValidator(schemas.cakesSchema), postCake);

export default cakesRouter;
