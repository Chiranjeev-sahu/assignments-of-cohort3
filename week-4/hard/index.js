import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import cors from 'cors';
import userRoutes from './routes/user.js'; // Import user routes

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const tasksFilePath = join(__dirname, 'data', 'tasks.json');
const dataDir = dirname(tasksFilePath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}
if (!fs.existsSync(tasksFilePath)) {
    fs.writeFileSync(tasksFilePath, JSON.stringify([]), 'utf8');
}

app.use(cors());
app.use(express.static(join(__dirname)));
app.use(express.json());

app.use('/', userRoutes); // Use user routes (signup, login)

app.get("/", (req, res) => {
    const apiBaseUrl = `http://localhost:${port}`;
    const indexPath = join(__dirname, 'index.html');
    fs.readFile(indexPath, 'utf8', (err, htmlContent) => {
        if (err) {
            console.error("Error reading index.html:", err);
            return res.status(500).send("Error loading the page.");
        }

        const modifiedHtml = htmlContent.replace('__API_BASE_URL__', apiBaseUrl);
        res.send(modifiedHtml);
    });
});
app.get("/tasks", (req, res)=>{
    try{
        const raw = fs.readFileSync(tasksFilePath, 'utf8');
        const tasks = JSON.parse(raw);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({error:`failure:${err}`});
    }
});

app.post("/tasks",(req, res)=>{
    try{
        const taskText = req.body.text;
        const rawData = fs.readFileSync(tasksFilePath, 'utf8');
        const tasks = JSON.parse(rawData);

        const newTask = {
            id: `task-${tasks.length + 1}`,
            text: taskText,
            status: 'todo'
        };

        tasks.push(newTask);

        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');

        res.status(201).json(newTask);
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ error: `Failed to create task: ${err.message}` });
    }
});
app.put("/tasks/:id", (req, res) => {
    try {
        const taskIdToUpdate = req.params.id;
        const updatedData = req.body;

        const rawData = fs.readFileSync(tasksFilePath, 'utf8');
        let tasks = JSON.parse(rawData);
        const taskIndex = tasks.findIndex(task => task.id === taskIdToUpdate);
        if (taskIndex === -1) {
            return res.status(404).json({ error: `Task with ID ${taskIdToUpdate} not found` });
        }

        // Update the task object
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
        tasks[taskIndex].id = taskIdToUpdate;
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');

        res.status(200).json(tasks[taskIndex]);

    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: `Failed to update task: ${err.message}` });
    }
});
app.delete("/tasks/:id", (req, res) => {
    try {
        const taskIdToDelete = req.params.id;
        const rawData = fs.readFileSync(tasksFilePath, 'utf8');
        let tasks = JSON.parse(rawData);
        const taskIndex = tasks.findIndex(task => task.id === taskIdToDelete);

        if (taskIndex === -1) {
            return res.status(404).json({ error: `Task with ID ${taskIdToDelete} not found` });
        }

        const deletedTask = tasks.splice(taskIndex, 1)[0];
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');

        res.status(200).json({ message: `Task with ID ${taskIdToDelete} deleted successfully`, deletedTask: deletedTask });

    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: `Failed to delete task: ${err.message}` });
    }
});

app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));