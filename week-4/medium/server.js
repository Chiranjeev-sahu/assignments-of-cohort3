const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON body data
app.use(express.json());

// In-memory database for To-Do items
let todos = []; // Example: [{ id: 1, title: "Learn Node.js", completed: false }]

// ROUTES

// GET: Fetch all To-Do items
app.get('/todos', (req, res) => {
    res.json(todos); // Send the array of todos as JSON
});

// POST: Create a new To-Do item
app.post('/todos', (req, res) => {
    const { title } = req.body; // Get 'title' from the request body
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
    const newTodo = {
        id: todos.length + 1,
        title: title,
        completed: false
    };
    todos.push(newTodo); // Add new todo to the array
    res.status(201).json(newTodo); // Send the created item
});

// PUT: Update an existing To-Do item
app.put('/todos/:id', (req, res) => {
    const { id } = req.params; // Get 'id' from the URL
    const { title, completed } = req.body; // Get updates from the request body
    const todo = todos.find(t => t.id === parseInt(id)); // Find the item by id
    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    // Update the To-Do item
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    res.json(todo); // Send the updated item
});

// DELETE: Delete a To-Do item
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params; // Get 'id' from the URL
    const index = todos.findIndex(t => t.id === parseInt(id)); // Find the index of the item
    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todos.splice(index, 1); // Remove the item from the array
    res.status(204).send(); // Send no content (success)
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
