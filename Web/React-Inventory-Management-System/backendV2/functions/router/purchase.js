const express = require("express");
const app = express();
const purchase = require("../controller/purchase");
const ServerlessHttp = require("serverless-http");
const router = express.Router();
// Add Purchase
router.post("/add", purchase.addPurchase);

// Get All Purchase Data
router.get("/get/:userID", purchase.getPurchaseData);

router.get("/get/:userID/totalpurchaseamount", purchase.getTotalPurchaseAmount);

module.exports.handler = ServerlessHttp(app);

// http://localhost:4000/api/purchase/add POST
// http://localhost:4000/api/purchase/get GET
