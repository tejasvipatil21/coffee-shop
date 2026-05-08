const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL connection (Docker environment)
const pool = new Pool({
  user: "postgres",
  host: "db", // service name in Docker network
  database: "coffee_shop",
  password: "password",
  port: 5432,
});

// Test DB connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("DB Connection Error:", err));

// Get all coffees
app.get("/coffees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM coffees");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add coffee
app.post("/coffees", async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO coffees (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});