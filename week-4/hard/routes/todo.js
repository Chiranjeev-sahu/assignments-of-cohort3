import { Router } from "express";
import { Todo } from '../../database/index.js';
import { authenticateJwt, isAdmin } from "../middleware/auth"; // Adjust the path to the authentication middleware
const router = Router();

// Todo Routes
// Protect all todo routes with JWT authentication and admin authorization
router.use(authenticateJwt); // All routes require JWT authentication
router.use(isAdmin); // All routes require admin authorization

// Route to create a new todo
router.post('/', async (req, res) => {
    try {
        const { content, createdBy, priority, complete} = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Content is required to the DB' });
        }
        const newTodo = await Todo.create({ content, createdBy, priority, complete });
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Failed to create todo: ' + error.message });
    }
});

// Route to get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({}); // Get all todos
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
});

// Route to get a todo by ID
router.get('/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).json({ message: 'Failed to fetch todo' });
    }
});

// Route to update a todo
router.put('/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const updatedData = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, updatedData, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Failed to update todo' });
    }
});

// Route to delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Failed to delete todo' });
    }
});

export default router;