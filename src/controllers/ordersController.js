import { STATUS_CODE } from "../enums/statusCode.js";
import * as ordersRepository from "../repositories/ordersRepository.js";

export async function postOrder(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    const clientExists = await ordersRepository.ifClientExists(clientId);
    const cakeExists = await ordersRepository.ifCakeExists(cakeId);

    if (clientExists.rowCount === 0) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .send("Este cliente não foi encontrado.");
    }

    if (cakeExists.rowCount === 0) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .send("Este bolo não está cadastrado.");
    } else {
      await ordersRepository.insertOrdersIntoOrders(
        clientId,
        cakeId,
        quantity,
        totalPrice
      );
      res.sendStatus(STATUS_CODE.CREATED);
    }
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}
