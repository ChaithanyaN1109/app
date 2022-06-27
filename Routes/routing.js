const express = require('express');

const routing = express.Router();
const app = require('../Controller/controller.js');

routing.post('/app', app.addData );
routing.put('/app/:ClientId', app.updateClient );
routing.get('/app/:AgencyId', app.getDetails );
routing.all('*', app.invalid);

module.exports = routing;
