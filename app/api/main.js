const express = require("express");
const bodyParser = require("body-parser");
const connection = require("../connection/connection");
const User = require("../model/User");
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const api = new express.Router();

const initApi = (app) => {
    app.set("json spaces", 2);
    app.use("/api", api);
};

api.use(bodyParser.json()); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property

api.get("/", (req, res) => {
    res.json({ message: "API is working" });
});

api.post("/users", async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] }); // Check if username or email already exists in the database ($or = or operator)
        if (existingUser) {
            res.json({ message: 'Username or email already exists', ping: '0' });
        } else {
            const random_id = uuid.v4();
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ id: random_id, username, password: hashedPassword, email });
            await user.save();
            res.json({ message: `User ${username} created successfully`, ping: '1' });
        }
    } catch (error) {
        console.log(error);
    }
    }
);

api.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {

        const user = await User.findOne({ username });
        
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password); // Compare the password entered by the user with the hashed password in the database
            if (passwordMatch) {
                res.json({ message: `Welcome ${username}`, ping: '1'});
            } else {
                res.json({ message: `Invalid username or password`, ping: '0' });
            }
        } else {
            res.json({ message: `Invalid username or password`, ping: '0' });
        }
        
    } catch (error) {
        console.log(error);
    };
});

module.exports = initApi;