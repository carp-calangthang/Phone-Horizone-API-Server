
const { Product_Upload, Show_Products, Find_Product, Delete_Product, Update_Product } = require("../controllers/ProductController"); // Import the UserRegister function from the UserControllers module
const validateToken = require("../middlewares/validToken"); // Import the validateToken middleware function

const express = require("express"); // Import the express module

const router = express.Router(); // Create a new Router object

router.get("/", Show_Products)

router.get("/find/:id", Find_Product); 

router.post("/upload", Product_Upload); 

router.delete("/delete", Delete_Product);

router.patch("/update/:id", Update_Product);

module.exports = router; // Export the router object