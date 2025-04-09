import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../database/index.js";
import { authenticateJwt, SECRET } from "../middleware/auth";

const router = Router();

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email },
      SECRET,
      { expiresIn: "1h" }
    ); //Generate a token
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error signing up user:", error);
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: "Validation error", errors });
    }
    res.status(500).json({ message: "Authentication failed" }); //Less specific
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      SECRET,
      { expiresIn: "1h" }
    ); //Generating a token
    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Authentication failed" }); //Less specific
  }
});

router.get("/todos", authenticateJwt, async (req, res) => {
  // Implement logic for getting todos for a user
  try {
    const userId = req.userId; // Extracted from JWT in middleware
    const user = await User.findById(userId).populate("todos"); //Get all todos to one user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ todos: user.todos });
  } catch (error) {
    console.error("Error getting todos:", error);
    res.status(500).json({ message: "Error processing request" }); //Less specific
  }
});

export default router;
