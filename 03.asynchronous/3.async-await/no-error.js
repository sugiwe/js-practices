import sqlite3 from "sqlite3";
import { runPromise, getPromise, closePromise } from "../db-operations.js";

const db = new sqlite3.Database(":memory:");
await runPromise(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);
const result = await runPromise(
  db,
  "INSERT INTO books(title) VALUES(?)",
  "独習JavaScript",
);
console.log(`新しい本が追加されました: ${result.lastID}`);
const row = await getPromise(db, "SELECT * FROM books");
console.log(`取得した本: ${row.title}`);
await runPromise(db, "DROP TABLE books");
await closePromise(db);
