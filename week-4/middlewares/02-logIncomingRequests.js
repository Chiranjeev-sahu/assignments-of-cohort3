//  Create a middleware that logs all incoming requests to the console.

const express = require('express');
const app = express();

function logRequests(req, res, next) {
    const method=req.method;
    const url=req.url;
    console.log(`${method} request to ${url} - ${new Date().toDateString()}`);
    next();
}

app.use(logRequests);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});
app.listen(3000);
// module.exports = app;
