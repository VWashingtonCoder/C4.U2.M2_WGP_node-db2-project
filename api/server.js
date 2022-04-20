const express = require('express');
const carsRouter = require('./cars/cars-router');

const server = express();

server.use(express.json());
server.use('/api/cars', carsRouter);

server.get('/', (req, res) => {
    res.send(`
        <h2>Cars API</h2>
        <p>Welcome to the Cars API</p>
    `)
})

module.exports = server;
