const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const controller = require('./controller.js');


const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ urlencoded: true }));
server.use(express.static(path.join(__dirname, '../public')));


server.get('/api/:id', (req, res) => {
  controller.getInfo(req.params.id)
    .then((info) => {
      res.status(200).send(info);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


server.get('/api/:id/search', (req, res) => {
  controller.getTables(req.params.id, req.query)
    .then((tables) => {
      res.status(200).send(tables);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


server.post('/api/:id/reservation', (req, res) => {
  controller.makeReservation(req.params.id, req.body.table)
    .then((table) => {
      res.status(200).send(table);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = server;
