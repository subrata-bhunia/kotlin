const express = require("express");
const app = express();
const store = require("../controller/store");
const ServerlessHttp = require("serverless-http");
const router = express.Router();
// Add Store
router.post("/add", store.addStore);

// Get All Store
router.get("/get/:userID", store.getAllStores);

module.exports.handler = ServerlessHttp(app);
