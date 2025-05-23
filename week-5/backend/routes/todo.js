const express = require("express");
const router = express.Router();
const { TodoModel } = require("../db/models");
const authMiddleware = require("../middleware/user");

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const { title, description, due, category, priority } = req.body;
    const userId = req.userId;

    const newTodo = new TodoModel({
      title,
      description,
      due,
      category,
      priority,
      userId,
    });

    const savedTodo = await newTodo.save();

    res.status(201).json({
      message: "Todo created successfully!",
      todo: savedTodo,
    });
  } catch (err) {
    console.error("Create Todo error:", err);
    res
      .status(500)
      .json({ message: "Failed to create todo. Please try again." });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.userId;

    const todos = await TodoModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Todos fetched successfully!",
      todos,
    });
  } catch (err) {
    console.error("Get All Todos error:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch todos. Please try again." });
  }
});

router.get("/:id", async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.userId;

        const todo = await TodoModel.findOne({ _id: todoId, userId: userId });

        if (!todo) {
        return res.status(404).json({ message: "Todo not found or you don't have access to it." });
        }

        res.status(200).json({
        message: "Todo fetched successfully!",
        todo,
        });
    } catch (err) {
        console.error("Get Todo by ID error:", err);
        if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Todo ID format." });
        }
        res
        .status(500)
        .json({ message: "Failed to fetch todo. Please try again." });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.userId;
        const updates = req.body;

        const updatedTodo = await TodoModel.findOneAndUpdate(
        { _id: todoId, userId: userId },
        updates,
        { new: true, runValidators: true }
        );
        if (!updatedTodo) {
        return res
            .status(404)
            .json({ message: "Todo not found or you don't have access to it." });
        }

        res.status(200).json({
        message: "Todo updated successfully!",
        todo: updatedTodo,
        });
    } catch (err) {
        console.error("Update Todo error:", err);
        if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid Todo ID format." });
        }
        res
        .status(500)
        .json({ message: "Failed to update todo. Please try again." });
    }
});

router.delete("/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const userId = req.userId;

    const deletedTodo = await TodoModel.findOneAndDelete({
      _id: todoId,
      userId: userId,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found or you don't have access to it." });
    }

    res.status(200).json({
      message: "Todo deleted successfully!",
      todo: deletedTodo,
    });
  } catch (err) {
    console.error("Delete Todo error:", err);
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid Todo ID format." });
    }
    res.status(500).json({ message: "Failed to delete todo. Please try again." });
  }
});

module.exports = router;
