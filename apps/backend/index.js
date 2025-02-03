import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import router from "./routes/index.js";
import placesRouter from "./routes/place.js";

import { config } from "dotenv";
import { query } from "./db/db.js";

// Initialize environment variables
config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("", router);
app.use("/palces", placesRouter);

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

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

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
