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

export async function getOrders(req, res) {
  try {
    const date = req.query.date;
    let orders;
    if (date) {
      orders = await ordersRepository.getOrdersByDate(date);
    } else {
      orders = await ordersRepository.getOrdersFromOrders();
    }

    if (orders.rowCount === 0)
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .send("Não há pedidos registrados.");

    const formattedOrders = orders.rows.map((row) => ({
      client: {
        id: row.clientId,
        name: row.clientName,
        address: row.clientAddress,
        phone: row.clientPhone,
      },
      cake: {
        id: row.cakeId,
        name: row.cakeName,
        price: row.cakePrice,
        description: row.cakeDescription,
        image: row.cakeImage,
      },
      orderId: row.orderId,
      createdAt: row.createdAt,
      quantity: row.quantity,
      totalPrice: row.totalPrice,
    }));

    res.status(STATUS_CODE.OK).json(formattedOrders);
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}

export async function getOrdersById(req, res) {
  const { id } = req.params;
  try {
    const orders = await ordersRepository.getOrdersById(id);

    if (orders.rowCount === 0)
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .send("Não há pedidos registrados.");
      
    const formattedOrder = orders.rows.map((row) => ({
      client: {
        id: row.clientId,
        name: row.clientName,
        address: row.clientAddress,
        phone: row.clientPhone,
      },
      cake: {
        id: row.cakeId,
        name: row.cakeName,
        price: row.cakePrice,
        description: row.cakeDescription,
        image: row.cakeImage,
      },
      orderId: row.orderId,
      createdAt: row.createdAt,
      quantity: row.quantity,
      totalPrice: row.totalPrice,
    }));

    res.status(STATUS_CODE.OK).send(formattedOrder);
  } catch (error) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }
}
