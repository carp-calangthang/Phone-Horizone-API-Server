
require('dotenv').config();
const uuid = require('uuid'); // Import the uuid module
const bcrypt = require('bcrypt'); // Import the bcrypt module
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken module
const asyncHandler = require('express-async-handler'); // Import the express-async-handler module

const User = require('../model/User'); // Import the User model

//@desc Register a new user 
//@route POST /api/users/register
//@access Public
const UserRegister = async (req, res) => {
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

//@desc Login a user
//@route POST /api/users/login  
//@access Public    
const UserLogin = async (req, res) => {
    const { username, password } = req.body;
    try {

        const user = await User.findOne({ username });
        
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password); // Compare the password entered by the user with the hashed password in the database
            if (passwordMatch) {
                const accessToken = jwt.sign({ 
                    email: user.email,
                    username: user.username, 
                    id: user.id }, 
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10m' }
                ); // Create a new access token
                res.status(200).json({ accessToken, message: `Welcome ${username}`, ping: '1' });
            } else {
                res.json({ message: `Invalid username or password`, ping: '0' });
            }
        } else {
            res.json({ message: `User is not register`, ping: 'null' });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    };
};

//@desc Get current user
//@route GET /api/users/current
//@access Private
const CurrentUser = asyncHandler( async (req, res) => {
    console.log("CurrentUser is called");
    res.status(200).json({ message: `${req.user}`, ping: '1' });
});

module.exports = { UserRegister, UserLogin, CurrentUser }; // Export the UserRegister, UserLogin, and CurrentUser functions 