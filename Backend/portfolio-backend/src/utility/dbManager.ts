import sqlite3 from "sqlite3";
export const db = new sqlite3.Database(
  "/Users/akshaykumaru/Development/KFINTECH/Backend/DB design/portfolio-db/portfolio-database",
  (error) => {
    if (error) {
      console.log(`Error connecting to db`);
    } else {
      console.log(`Successfully connected to db`);
      db.run("PRAGMA foreign_keys = ON");
    }
  },
);
