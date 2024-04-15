const initApi = require('./app/api/api');

const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');

const connection = require('./app/connection/connection');

const app = express();

connection();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

initApi(app);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});

