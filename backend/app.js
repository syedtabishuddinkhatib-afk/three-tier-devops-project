const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "devopsdb",
  port: 5432
});

app.get("/health", (req, res) => {
  res.send("Backend is healthy");
});

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
