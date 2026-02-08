const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Bin Schema
const binSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true },
    acceptedItems: { type: [String], default: [] },
    fillLevel: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["operational", "full", "maintenance"],
      default: "operational",
    },
  },
  { timestamps: true }
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    userType: { type: String, enum: ["user", "admin"], default: "user" },
    points: { type: Number, default: 0 },
    totalRecycled: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    co2Saved: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Detection Schema
const detectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: { type: String, required: true },
    name: { type: String, required: true },
    confidence: { type: Number, required: true },
    weight: { type: Number, required: true },
    value: { type: Number, required: true },
    points: { type: Number, required: true },
    co2Saved: { type: Number, required: true },
    condition: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const Bin = mongoose.model("Bin", binSchema);
const User = mongoose.model("User", userSchema);
const Detection = mongoose.model("Detection", detectionSchema);

// =======================================================
// ROUTES
// =======================================================

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// =======================================================
// AUTH ROUTES
// =======================================================

// User Registration
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, phone, password, userType } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password,
      userType: userType || "user",
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// ✅ FIXED LOGIN ROUTE (matches userType also)
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ message: "Missing login fields" });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
      password,
      userType,
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
});

// =======================================================
// BIN ROUTES
// =======================================================

// GET All Bins
app.get("/api/bins", async (req, res) => {
  try {
    const bins = await Bin.find();
    res.json(bins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bins", error });
  }
});

// GET Single Bin by MongoDB _id
app.get("/api/bins/:id", async (req, res) => {
  try {
    const bin = await Bin.findById(req.params.id);

    if (!bin) {
      return res.status(404).json({ message: "Bin not found" });
    }

    res.json(bin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bin", error });
  }
});

// POST Create New Bin
app.post("/api/bins", async (req, res) => {
  try {
    const newBin = new Bin(req.body);
    const savedBin = await newBin.save();
    res.status(201).json(savedBin);
  } catch (error) {
    res.status(500).json({ message: "Error adding bin", error });
  }
});

// PUT Update Bin by MongoDB _id
app.put("/api/bins/:id", async (req, res) => {
  try {
    const updatedBin = await Bin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBin) {
      return res.status(404).json({ message: "Bin not found" });
    }

    res.json(updatedBin);
  } catch (error) {
    res.status(500).json({ message: "Error updating bin", error });
  }
});

// DELETE Bin by MongoDB _id
app.delete("/api/bins/:id", async (req, res) => {
  try {
    const deletedBin = await Bin.findByIdAndDelete(req.params.id);

    if (!deletedBin) {
      return res.status(404).json({ message: "Bin not found" });
    }

    res.json({ message: "Bin deleted successfully", deletedBin });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bin", error });
  }
});

// =======================================================
// USER ROUTES
// =======================================================

// GET User Profile
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// =======================================================
// SAVE RECYCLED ITEM
// =======================================================
app.post("/api/recycle", async (req, res) => {
  try {
    const { userId, item } = req.body;

    if (!userId || !item) {
      return res.status(400).json({ message: "userId and item are required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newDetection = new Detection({
      userId,
      type: item.type,
      name: item.name,
      confidence: item.confidence,
      weight: item.weight,
      value: item.value,
      points: item.points,
      co2Saved: item.co2Saved,
      condition: item.condition,
      image: item.image || "",
    });

    await newDetection.save();

    user.points += item.points || 0;
    user.totalRecycled += 1;
    user.co2Saved += item.co2Saved || 0;

    if (user.totalRecycled === 1 && !user.badges.includes("First Drop")) {
      user.badges.push("First Drop");
    }

    await user.save();

    res.json({
      message: "Recycling recorded successfully",
      updatedUser: user,
      savedDetection: newDetection,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving recycling data", error });
  }
});

// =======================================================
// GET Recent Detections
// =======================================================
app.get("/api/detections/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const detections = await Detection.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(detections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching detections", error });
  }
});

// =======================================================
// SERVER LISTEN
// =======================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});