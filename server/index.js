import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- MONGODB -------------------- */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* -------------------- SCHEMA -------------------- */
const memberSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    bloodGroup: String,
    allergies: String,
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);

/* -------------------- ROUTES -------------------- */

// Health check (THIS IS WHY `/` WORKS)
app.get("/", (req, res) => {
  res.json({
    status: "API is running",
    service: "Family Health Vault API",
    time: new Date().toISOString(),
  });
});

// Get all members
app.get("/members", async (req, res) => {
  const members = await Member.find().sort({ createdAt: -1 });
  res.json(members);
});

// Add member
app.post("/members", async (req, res) => {
  const member = new Member(req.body);
  await member.save();
  res.status(201).json(member);
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
