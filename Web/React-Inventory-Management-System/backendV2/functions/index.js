const express = require("express");
const { main } = require("./models/index");
const cors = require("cors");
const User = require("./models/users");
const Product = require("./models/product");
const serverless = require("serverless-http");
const product = require("./controller/product");
const store = require("./controller/store");
const purchase = require("./controller/purchase");
const sales = require("./controller/sales");
const billing = require("./controller/billing")
// Swagger configuration
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// ... (rest of your code)

const app = express();
const PORT = 4000;
main();
app.use(express.json());
app.use(cors());

const router = express.Router();

// Store API
// Add Store
router.post("/api/store/add", store.addStore);

// Get All Store
router.get("/api/store/get/:userID", store.getAllStores);

// Products API
// Add Product
router.post("/api/product/add", product.addProduct);

// Get All Products
router.get("/api/product/get/:userId", product.getAllProducts);

// Delete Selected Product Item
router.get("/api/product/delete/:id", product.deleteSelectedProduct);

// Update Selected Product
router.post("/api/product/update", product.updateSelectedProduct);

// Search Product
router.get("/api/product/search", product.searchProduct);

// Purchase API
// Add Purchase
router.post("/api/purchase/add", purchase.addPurchase);

// Get All Purchase Data
router.get("/api/purchase/get/:userID", purchase.getPurchaseData);

router.get(
  "/api/purchase/get/:userID/totalpurchaseamount",
  purchase.getTotalPurchaseAmount
);

// Sales API
// router.use("/api/sales", salesRoute);
// Add Sales
router.post("/api/sales/add", sales.addSales);

// Get All Sales
router.get("/api/sales/get/:userID", sales.getSalesData);
router.get("/api/sales/getmonthly", sales.getMonthlySales);

router.get("/api/sales/get/:userID/totalsaleamount", sales.getTotalSalesAmount);

// Billing API
// Add Billing
router.post("/api/billing/add", billing.addBilling);

// Get All Billing Data
router.get("/api/billing/get/:userID", billing.getBillingData);

// Get Total Billing Amount
router.get("/api/billing/get/:userID/totalbillingamount", billing.getTotalBillingAmount);

// Get Monthly Billing
router.get("/api/billing/getmonthly/:userID", billing.getMonthlyBilling);


// ------------- Signin --------------
let userAuthCheck;
router.post("/api/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log("USER: ", user);
    if (user) {
      res.send(user);
      userAuthCheck = user;
    } else {
      res.status(401).send("Invalid Credentials");
      userAuthCheck = null;
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Getting User Details of login user
router.get("/api/login", (req, res) => {
  res.send(userAuthCheck);
});
// ------------------------------------

// Registration API
router.post("/api/register", (req, res) => {
  let registerUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    imageUrl: req.body.imageUrl,
  });

  registerUser
    .save()
    .then((result) => {
      res.status(200).send(result);
      alert("Signup Successfull");
    })
    .catch((err) => console.log("Signup: ", err));
  console.log("request: ", req.body);
});

router.get("/testget", async (req, res) => {
  const result = await Product.findOne({ _id: "6429979b2e5434138eda1564" });
  res.json(result);
});

router.get("/", async (req, res) => {
  res.send(`<h1>Welcome to BMB</h1> <p>${req.hostname}</p>`);
});

// Serve Swagger UI
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use("/.netlify/functions/index", router);
module.exports.handler = serverless(app);


