import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import cakesRouter from "./routers/cakesRouter.js";
import clientsRouter from "./routers/clientsRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(cakesRouter);
app.use(clientsRouter);

app.listen(process.env.PORT, () =>
  console.log(chalk.cyan(`Server running on PORT ${process.env.PORT}`))
);