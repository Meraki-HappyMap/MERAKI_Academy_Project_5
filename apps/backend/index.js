import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { query } from "./db/db.js";

// Initialize environment variables
config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route using async/await
app.get("/api/health", async (req, res) => {
  try {
    await query("SELECT NOW()");
    res.status(200).json({
      status: "ok",
      message: "Server is running",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Database connection error",
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
