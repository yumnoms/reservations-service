const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database.js');


const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ urlencoded: true }));
server.use(express.static(path.join(__dirname, '../public')));


// server.get('/api/:id', (req, res) => {

// });


// server.get('/api/:id/search', (req, res) => {

// });


// server.post('/api/:id/reservation', (req, res) => {

// });


const port = 3000;
server.listen(port, () => {
  console.log(`Server up and running! Listening on port ${port}...`);
  console.log(`http://localhost:${port}`);
  db.initialize();
});
