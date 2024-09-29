import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inventory from "./pages/Inventory";
import NoPageFound from "./pages/NoPageFound";
import AuthContext from "./AuthContext";
import ProtectedWrapper from "./ProtectedWrapper";
import { useEffect, useState } from "react";
import Store from "./pages/Store";
import Sales from "./pages/Sales";
import PurchaseDetails from "./pages/PurchaseDetails";
import Billing from "./pages/Billing";
import AddNewBillForm from "./components/AddNewBillFrom";

const App = () => {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  const [billingData, setBillingData] = useState([
    {
      "id": 1,
      "customerName": "John Doe",
      "customerPhone": "+91-9876543210",
      "items": [
          {
              "name": "Paracetamol",
              "quantity": 2,
              "price": 50.00
          },
          {
              "name": "Cough Syrup",
              "quantity": 1,
              "price": 120.00
          }
      ],
      "date": "2024-08-01",
      "status": "Paid",
      "totalAmount": "₹220.00",
      "finalPrice":"₹220.00"
  }
  ]);
  let myLoginUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (myLoginUser) {
      setUser(myLoginUser._id);
      setLoader(false);
    } else {
      setUser("");
      setLoader(false);
    }
  }, [myLoginUser]);

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };
  const addNewBill = (newbill) => {
    setBillingData((prev) => [...prev, newbill]);
  };
  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let value = { user, signin, signout, billingData, addNewBill };

  if (loader)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>LOADING...</h1>
      </div>
    );

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedWrapper>
                <Layout />
              </ProtectedWrapper>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchase-details" element={<PurchaseDetails />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/manage-store" element={<Store />} />
            <Route path="/manage-billing" element={<Billing />} />
            <Route path="/manage-billing/add" element={<AddNewBillForm />} />
          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
