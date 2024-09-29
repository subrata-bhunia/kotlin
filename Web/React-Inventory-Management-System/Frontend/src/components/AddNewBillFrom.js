import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";
import { useNavigate } from "react-router-dom";

const availableItems = [
  {
    id: 1,
    name: "Paracetamol",
    price: 50.0,
    hsnCode: "HSN" + Math.floor(Math.random() * 999),
  },
  {
    id: 2,
    name: "Cough Syrup",
    price: 120.0,
    hsnCode: "HSN" + Math.floor(Math.random() * 999),
  },
  {
    id: 3,
    name: "Vitamin C Tablets",
    price: 150.0,
    hsnCode: "HSN" + Math.floor(Math.random() * 999),
  },
  {
    id: 4,
    name: "Bandages",
    price: 75.0,
    hsnCode: "HSN" + Math.floor(Math.random() * 999),
  },
  {
    id: 5,
    name: "Antibiotic Cream",
    price: 200.0,
    hsnCode: "HSN" + Math.floor(Math.random() * 999),
  },
  {
    id: 6,
    name: "Pain Reliever",
    price: 50.0,
    hsnCode: "HSN" + Math.floor(Math.random() * 999),
  },
];

const AddNewBillForm = ({}) => {
  const { user, addNewBill } = useContext(AuthContext);
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [items, setItems] = useState([
    { id: Date.now(), item: "", quantity: 1, search: "" },
  ]);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [status, setStatus] = useState("Pending");

  // Validation state
  const [errors, setErrors] = useState({});

  // Accordion state management
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(true);
  const [isItemSelectionOpen, setIsItemSelectionOpen] = useState(false);
  const [isBillAndTaxOpen, setIsBillAndTaxOpen] = useState(false);

  useEffect(() => {
    const selectedItems = items.map((item) => {
      const foundItem = availableItems.find((ai) => ai.name === item.item);
      return {
        name: item.item,
        quantity: item.quantity,
        price: foundItem ? foundItem.price : 0,
      };
    });

    const newTotalAmount = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(newTotalAmount);

    const discountAmount = (newTotalAmount * discountPercentage) / 100;
    const newPriceAfterDiscount = newTotalAmount - discountAmount;
    setPriceAfterDiscount(newPriceAfterDiscount);

    const taxAmount = (newPriceAfterDiscount * taxPercentage) / 100;
    const newFinalPrice = newPriceAfterDiscount + taxAmount;
    setFinalPrice(newFinalPrice);
  }, [items, discountPercentage, taxPercentage]);

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Customer Name validation
    if (!customerName.trim()) {
      newErrors.customerName = "Customer name is required.";
    }

    // Customer Phone validation
    if (!customerPhone.trim()) {
      newErrors.customerPhone = "Customer phone number is required.";
    } else if (!/^\d{10}$/.test(customerPhone)) {
      newErrors.customerPhone = "Phone number must be 10 digits.";
    }

    // Items validation
    items.forEach((item, index) => {
      if (!item.item.trim()) {
        newErrors[`item-${index}`] = "Item selection is required.";
      }
      if (item.quantity <= 0) {
        newErrors[`quantity-${index}`] = "Quantity must be at least 1.";
      }
    });

    // Discount validation
    if (discountPercentage < 0 || discountPercentage > 100) {
      newErrors.discountPercentage = "Discount must be between 0 and 100.";
    }

    // Tax validation
    if (taxPercentage < 0 || taxPercentage > 100) {
      newErrors.taxPercentage = "Tax must be between 0 and 100.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  const handleAddItemSection = () => {
    setItems([...items, { id: Date.now(), item: "", quantity: 1, search: "" }]);
  };

  const handleRemoveItemSection = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, newItem) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, item: newItem } : item))
    );
  };

  const handleQuantityChange = (id, newQuantity) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleSearchChange = (id, searchQuery) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, search: searchQuery } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const selectedItems = items.map((item) => {
      const foundItem = availableItems.find((ai) => ai.name === item.item);
      return {
        name: item.item,
        quantity: item.quantity,
        price: foundItem ? foundItem.price : 0,
        hsnCode: foundItem.hsnCode,
      };
    });

    const newBill = {
      customerName,
      customerPhone,
      items: selectedItems,
      date: new Date().toISOString().split("T")[0],
      status,
      discountPercentage,
      taxPercentage,
      totalAmount: `₹${totalAmount.toFixed(2)}`,
      priceAfterDiscount: `₹${priceAfterDiscount.toFixed(2)}`,
      finalPrice: `₹${finalPrice.toFixed(2)}`,
      invID: `INV${Math.floor(Math.random() * 9999)}`,
    };

    addNewBill(newBill);
    setCustomerName("");
    setCustomerPhone("");
    setItems([{ id: Date.now(), item: "", quantity: 1, search: "" }]);
    setDiscountPercentage(0);
    setTaxPercentage(0);
    setTotalAmount(0);
    setPriceAfterDiscount(0);
    setFinalPrice(0);
    setStatus("Pending");
    setErrors({});
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 col-span-10 p-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Bill</h2>

      {/* Customer Details Section */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm">
        <h3
          className="text-xl font-semibold mb-2 cursor-pointer flex"
          onClick={() => setIsCustomerDetailsOpen(!isCustomerDetailsOpen)}
        >
          Customer Details {isCustomerDetailsOpen ? "-" : "+"}
        </h3>
        {isCustomerDetailsOpen && (
          <div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              {errors.customerName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Customer Phone</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              {errors.customerPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerPhone}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Item Selection Section */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm">
        <h3
          className="text-xl font-semibold mb-2 cursor-pointer"
          onClick={() => setIsItemSelectionOpen(!isItemSelectionOpen)}
        >
          Item Selection {isItemSelectionOpen ? "-" : "+"}
        </h3>
        {isItemSelectionOpen && (
          <div>
            {items.map((item, index) => (
              <div key={item.id} className="flex items-center mb-4">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={item.search}
                    onChange={(e) =>
                      handleSearchChange(item.id, e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  />
                  <select
                    value={item.item}
                    onChange={(e) => handleItemChange(item.id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select an item</option>
                    {availableItems
                      .filter((i) =>
                        i.name.toLowerCase().includes(item.search.toLowerCase())
                      )
                      .map((i) => (
                        <option key={i.id} value={i.name}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </div>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                  className="w-20 p-2 ml-4 border border-gray-300 rounded-md"
                  required
                  min="1"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItemSection(item.id)}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
                {errors[`item-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`item-${index}`]}
                  </p>
                )}
                {errors[`quantity-${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`quantity-${index}`]}
                  </p>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddItemSection}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Add Another Item
            </button>
          </div>
        )}
      </div>

      {/* Bill & Tax Section */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm">
        <h3
          className="text-xl font-semibold mb-2 cursor-pointer"
          onClick={() => setIsBillAndTaxOpen(!isBillAndTaxOpen)}
        >
          Bill & Tax {isBillAndTaxOpen ? "-" : "+"}
        </h3>
        {isBillAndTaxOpen && (
          <div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Total Amount</label>
              <input
                type="text"
                value={`₹${totalAmount.toFixed(2)}`}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Discount (%)</label>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) =>
                  setDiscountPercentage(parseFloat(e.target.value) || 0)
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              {errors.discountPercentage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.discountPercentage}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">
                Price After Discount
              </label>
              <input
                type="text"
                value={`₹${priceAfterDiscount.toFixed(2)}`}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Tax (%)</label>
              <input
                type="number"
                value={taxPercentage}
                onChange={(e) =>
                  setTaxPercentage(parseFloat(e.target.value) || 0)
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              {errors.taxPercentage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.taxPercentage}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Final Price</label>
              <input
                type="text"
                value={`₹${finalPrice.toFixed(2)}`}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Bill
      </button>
    </form>
  );
};

export default AddNewBillForm;
