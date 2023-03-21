import { db } from "../database/database.js";
import { TABLE } from "../enums/tables.js";

export async function insertCakeIntoCakes(name, price, description, image) {
  return db.query(
    `INSERT INTO ${TABLE.CAKES} (name, price, description, image) SELECT $1, $2, $3, $4 WHERE NOT EXISTS (SELECT * FROM ${TABLE.CAKES} WHERE name = $5);`,
    [name, price, description, image, name]
  );
}

export async function getCakesfromCakes() {
  return db.query(`SELECT * FROM ${TABLE.CAKES}`);
}
