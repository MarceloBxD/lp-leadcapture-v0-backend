import express from "express";
import { pool } from "../lib/dbConnection.js";

const router = express.Router();

async function emailAlreadyExists(email) {
  const result = await pool.query("SELECT * FROM newsletter WHERE email = $1", [email]);
  return result.rows.length > 0;
}

async function createTableIfNotExists() {
  try {
    const result = await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter (
        email VARCHAR(255) PRIMARY KEY
      )
    `);
    console.log("Table created or already exists:", result);
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

router.get("/newsletter", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM newsletter");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/newsletter", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send("Email is required");
    }

    // Criação da tabela, caso ela não exista
    await createTableIfNotExists();

    if (await emailAlreadyExists(email)) {
      return res.status(400).send("Email already exists");
    }

    await pool.query("INSERT INTO newsletter (email) VALUES ($1)", [email]);

    res.status(201).send(`Email ${email} has been added to the newsletter list`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
