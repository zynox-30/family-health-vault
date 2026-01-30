import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (MANDATORY)
app.get("/", (req, res) => {
  res.json({
    status: "API is running",
    service: "Family Health Vault API",
    time: new Date().toISOString()
  });
});

// Health check route
app.get("/health", async (req, res) => {
  try {
    const state = mongoose.connection.readyState;
    res.json({
      mongo:
        state === 1 ? "connected" :
        state === 2 ? "connecting" :
        state === 0 ? "disconnected" :
        "unknown"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
