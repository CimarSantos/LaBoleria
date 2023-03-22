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

export async function getOrdersFromOrders() {
  return await db.query(`
    SELECT 
      o.id AS "orderId", 
      o."createdAt", 
      o.quantity, 
      o."totalPrice", 
      c.id AS "clientId", 
      c.name AS "clientName", 
      c.address AS "clientAddress", 
      c.phone AS "clientPhone", 
      ca.id AS "cakeId", 
      ca.name AS "cakeName", 
      ca.price AS "cakePrice", 
      ca.description AS "cakeDescription", 
      ca.image AS "cakeImage"
    FROM ${TABLE.ORDERS} o
    INNER JOIN ${TABLE.CLIENTS} c 
      ON o."clientId" = c.id
    INNER JOIN ${TABLE.CAKES} ca 
      ON o."cakeId" = ca.id
  `);
}

export async function getOrdersById(id) {
  return db.query(
    `SELECT 
      o.id AS "orderId", 
      o."createdAt", 
      o.quantity, 
      o."totalPrice", 
      c.id AS "clientId", 
      c.name AS "clientName", 
      c.address AS "clientAddress", 
      c.phone AS "clientPhone", 
      ca.id AS "cakeId", 
      ca.name AS "cakeName", 
      ca.price AS "cakePrice", 
      ca.description AS "cakeDescription", 
      ca.image AS "cakeImage"
    FROM ${TABLE.ORDERS} o
    INNER JOIN ${TABLE.CLIENTS} c 
      ON o."clientId" = c.id
    INNER JOIN ${TABLE.CAKES} ca 
      ON o."cakeId" = ca.id
      WHERE o.id = $1;`,
    [id]
  );
}

export async function getOrdersByDate(date) {
  return db.query(`SELECT * FROM ${TABLE.ORDERS} WHERE "createdAt" = $1;`, [
    date,
  ]);
}