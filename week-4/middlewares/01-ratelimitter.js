const express = require('express');
const app = express();

// Initialize the rate-limiting object
let numberOfRequestsForUser = {};

// Middleware for rate limiting
app.use((req, res, next) => {
  const userid = req.header('user-id');
  if (!userid) {
    return res.status(400).json({ error: 'user-id is required' });
  }

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

  // Initialize user entry if it doesn't exist
  if (!numberOfRequestsForUser[userid]) {
    numberOfRequestsForUser[userid] = { count: 0, lastRequestTime: currentTime };
  }

  const userData = numberOfRequestsForUser[userid];

  // Check if the request is within the same second
  if (currentTime === userData.lastRequestTime) {
    userData.count += 1; // Increment the request count
  } else {
    userData.count = 1; // Reset count for a new second
    userData.lastRequestTime = currentTime;
  }

  // Check if the request limit is exceeded
  if (userData.count > 5) {
    return res.status(404).json({ error: 'Too many requests' });
  }

  next(); // Proceed to the next middleware/route
});

// Clear the rate-limiting data every second
setInterval(() => {
  numberOfRequestsForUser = {};
}, 1000);

// Routes
app.get('/user', function (req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function (req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

module.exports = app;
