const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const Secrets = require('../secrets/Secrets');

const app = express();

mongoose.connect(Secrets.GetStringConnection(), { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors()); // { origin: 'http://localhost:3000' }
app.use(express.json());
app.use(routes);
app.listen(3333);