const express = require("express");
const app = express();
const product = require("../controller/product");
const ServerlessHttp = require("serverless-http");
const router = express.Router();
// Add Product
router.post("/add", product.addProduct);

// Get All Products
router.get("/get/:userId", product.getAllProducts);

// Delete Selected Product Item
router.get("/delete/:id", product.deleteSelectedProduct);

// Update Selected Product
router.post("/update", product.updateSelectedProduct);

// Search Product
router.get("/search", product.searchProduct);

// http://localhost:4000/api/product/search?searchTerm=fa

module.exports.handler = ServerlessHttp(app);
