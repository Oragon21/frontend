const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Dummy data
const responseData = { message: 'Hello from the server!' };

// Endpoint for the GET request
app.get('/test', (req, res) => {
    res.json(responseData);
});

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
