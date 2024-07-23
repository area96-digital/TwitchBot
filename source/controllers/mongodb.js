import { MongoClient } from "mongodb";

const DATABASE = process.env.ENVIRONMENT || "test";

/**
 * Connects to the database.
 * This is called automatically by other functions.
 * You should not need to call this manually.
 *
 * @returns {Promise<MongoClient>} The connected MongoDB client
 */
export async function connect() {
  const mongo = new MongoClient(process.env.MONGODB_URI);

  await mongo.connect();

  return mongo;
}

/**
 * Inserts an object into the database.
 *
 * @param {string} table The table to insert the object into
 * @param {object} object The object to insert
 *
 * @returns {Promise<object>} The inserted object
 *
 * @example
 * await insert("users", { name: "Alice" });
 */
export async function insert(table, object) {
  const mongo = await connect();

  const data = await mongo.db(DATABASE).collection(table).insertOne(object);

  await mongo.close();

  return data;
}

export default { connect, insert };
