const express = require("express");
const bodyParser = require("body-parser");
const HandleSession = require("../middlewares/HandleSession");

const api = new express.Router();

const initApi = (app) => {
    app.set("json spaces", 2); // Pretty print the JSON response? 2 is the number of spaces to indent
    app.use("/api", api);
};

api.use(bodyParser.json());

api.use('/users', require('../routes/User'))
api.use('/product', require('../routes/Product'))
api.use(HandleSession)

module.exports = initApi;