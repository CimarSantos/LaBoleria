import { db } from "../database/database.js";
import { TABLE } from "../enums/tables.js";

export async function insertClientsIntoClients(name, address, phone) {
  return db.query(
    `INSERT INTO ${TABLE.CLIENTS} (name, address, phone) SELECT $1, $2, $3 WHERE NOT EXISTS 
        (SELECT * FROM ${TABLE.CLIENTS} WHERE name = $4);`,
    [name, address, phone, name]
  );
}

export async function getClientsById(id) {
  return db.query(`SELECT * FROM ${TABLE.CLIENTS} WHERE id = $1;`, [id]);
}

export async function getClientsAndOrdersById(id) {
  return await db.query(
    `
    SELECT
        o.id AS "orderId",
        o.quantity,
        o."createdAt",
        o."totalPrice",
        ca.name AS "cakeName"
        FROM ${TABLE.ORDERS} o 
        INNER JOIN ${TABLE.CAKES} ca ON o."cakeId" = ca.id
        INNER JOIN ${TABLE.CLIENTS} c ON o."clientId" = c.id
        WHERE c.id = $1;
`,
    [id]
  );
}
