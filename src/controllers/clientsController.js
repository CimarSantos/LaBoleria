import { STATUS_CODE } from "../enums/statusCode.js";
import * as clientsRepository from "../repositories/clientsRepository.js";

export async function postClient(req, res) {
  const { name, address, phone } = req.body;

  try {
    const { rowCount } = await clientsRepository.insertClientsIntoClients(
      name,
      address,
      phone
    );
    if (rowCount === 1) return res.sendStatus(STATUS_CODE.CREATED);
    else {
      return res
        .status(STATUS_CODE.CONFLICT)
        .send("Este cliente já está registrado!");
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}
