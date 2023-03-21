import { STATUS_CODE } from "../enums/statusCode.js";
import * as cakesRepository from "../repositories/cakesRepository.js";

export async function postCake(req, res) {
  const { name, price, description, image } = req.body;

  try {
    const { rowCount } = await cakesRepository.insertCakeIntoCakes(
      name,
      price,
      description,
      image
    );
    if (rowCount === 1) return res.sendStatus(STATUS_CODE.OK);
    else {
      return res
        .status(STATUS_CODE.CONFLICT)
        .send("Este Bolo já está registrado!");
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}
