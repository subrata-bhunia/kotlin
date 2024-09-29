const express = require("express");
const app = express();
const sales = require("../controller/sales");
const ServerlessHttp = require("serverless-http");
const router = express.Router();
// Add Sales
router.post("/add", sales.addSales);

// Get All Sales
router.get("/get/:userID", sales.getSalesData);
router.get("/getmonthly", sales.getMonthlySales);

router.get("/get/:userID/totalsaleamount", sales.getTotalSalesAmount);

module.exports.handler = ServerlessHttp(app);

// http://localhost:4000/api/sales/add POST
// http://localhost:4000/api/sales/get GET
