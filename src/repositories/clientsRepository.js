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
