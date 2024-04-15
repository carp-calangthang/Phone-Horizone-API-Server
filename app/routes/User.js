
const { UserRegister, UserLogin, CurrentUser } = require("../controllers/UserControllers"); // Import the UserRegister function from the UserControllers module
const validateToken = require("../middlewares/validToken"); // Import the validateToken middleware function

const express = require("express"); // Import the express module

const router = express.Router(); // Create a new Router object

router.get("/", (req, res) => {
    res.json({ message: "User API is working" }); // Return a JSON object with a message
});

router.post("/register", UserRegister);
router.post("/login", UserLogin);

router.get("/current", validateToken, CurrentUser);

module.exports = router; // Export the router object