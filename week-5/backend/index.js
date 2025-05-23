require("dotenv").config();

const express = require("express");
const cors = require("cors"); 
const connectDB = require("./db/config"); 
const userRoutes = require("./routes/user"); 
const todoRoutes = require("./routes/todo");

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.use('/api/auth', userRoutes);
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke on the server!'); 
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});