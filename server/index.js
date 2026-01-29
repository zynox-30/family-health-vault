const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔐 MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// 📌 Schemas
const MemberSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bloodGroup: String,
  allergies: String,
});

const RecordSchema = new mongoose.Schema({
  memberId: String,
  title: String,
  filePath: String,
  uploadedAt: { type: Date, default: Date.now },
});

const Member = mongoose.model("Member", MemberSchema);
const Record = mongoose.model("Record", RecordSchema);

// 📌 Multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 🔹 Routes
app.get("/members", async (_, res) => {
  res.json(await Member.find());
});

app.post("/members", async (req, res) => {
  const member = new Member(req.body);
  await member.save();
  res.json(member);
});

app.post("/records", upload.single("file"), async (req, res) => {
  const record = new Record({
    memberId: req.body.memberId,
    title: req.body.title,
    filePath: req.file.filename,
  });
  await record.save();
  res.json(record);
});

app.get("/records/:memberId", async (req, res) => {
  res.json(await Record.find({ memberId: req.params.memberId }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
//IHDh1TEKoQ9AzRHt