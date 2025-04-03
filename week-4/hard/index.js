const express = require("express");
const dotenv = require("dotenv");
const path=require("path");
const fs=require("fs");
dotenv.config();

const app = express();
const port = process.env.PORT;

const tasksFilePath=path.join(__dirname, 'data', 'tasks.json')
app.use(express.json());

app.get("/tasks", (req, res)=>{
    try{
        const raw=fs.readFileSync(tasksFilePath,'utf8');
        const tasks=JSON.parse(raw);
        res.json(tasks);
    }catch(err){
        res.status(500).json({error:`failure:${err}`});
    }
});

app.post("/tasks",(req,res)=>{
    try{
        const taskText=req.body.text;
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
