// api/index.js (This will be your main serverless function file)

const express = require('express');
const server = express();

server.use(express.json());

// Define your routes as usual
server.get('/api', (req, res) => {
    res.send('Hello from Express on Vercel!');
});

// Vercel's Node.js runtime expects to export a function
module.exports = (req, res) => {
    return server(req, res);
};
