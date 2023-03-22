import { db } from "../database/database.js";
import { TABLE } from "../enums/tables.js";

export async function ifClientExists(clientId) {
  return db.query(`SELECT * FROM ${TABLE.CLIENTS} WHERE id = $1;`, [clientId]);
}

export async function ifCakeExists(cakeId) {
  return db.query(`SELECT * FROM ${TABLE.CAKES} WHERE id = $1;`, [cakeId]);
}

export async function insertOrdersIntoOrders(
  clientId,
  cakeId,
  quantity,
  totalPrice
) {
  return db.query(
    `INSERT INTO ${TABLE.ORDERS} ("clientId", "cakeId", quantity, "totalPrice") VALUES ($1, $2, $3, $4);`,
    [clientId, cakeId, quantity, totalPrice]
  );
}
