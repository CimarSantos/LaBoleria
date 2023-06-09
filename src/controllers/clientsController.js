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

export async function getClient(req, res) {
  const { id } = req.params;
  try {
    const client = await clientsRepository.getClientsAndOrdersById(id);
    if (client.rowCount === 0)
      return res.status(STATUS_CODE.NOT_FOUND).send("Cliente não encontrado");
    res.status(STATUS_CODE.OK).send(client.rows);
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}

export async function getClientsOrdersByClientId(req, res) {
  const { id } = req.params;
  try {
    const result = await clientsRepository.getClientsAndOrdersById(id);
    if (result.rowCount === 0)
      return res.status(STATUS_CODE.NOT_FOUND).send("Cliente não encontrado");

    const formattedResult = result.rows.map((row) => ({
      orderId: row.orderId,
      quantity: row.quantity,
      createdAt: row.createdAt,
      totalPrice: row.totalPrice,
      cakeName: row.cakeName,
    }));

    res.status(STATUS_CODE.OK).send(formattedResult);
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}