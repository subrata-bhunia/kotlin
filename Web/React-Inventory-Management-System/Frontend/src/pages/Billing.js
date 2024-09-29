import React, { useContext, useState } from "react";
import Modal from "../components/Modal";
import AddNewBillForm from "../components/AddNewBillFrom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import Invoice from "../components/Invoice";

const MedicalBillingTable = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [download, setDownload] = useState(false);
  const [current, setCurrent] = useState({});

  //   const handleAddBill = (newBill) => {
  //     setBillingData([...billingData, newBill]);
  //     setIsModalOpen(false);
  //   };
  const handleAddEntry = () => {
    navigate("/manage-billing/add");
  };
  const { billingData } = useContext(AuthContext);
  const filteredData = billingData.filter((entry) =>
    entry.customerName.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-semibold px-4">Overall Inventory</span>
          <div className=" flex flex-col md:flex-row justify-center items-center  ">
            <div className="flex flex-col p-10  w-full  md:w-3/12  ">
              <span className="font-semibold text-blue-600 text-base">
                Total Products
              </span>
              <span className="font-semibold text-gray-600 text-base">{0}</span>
              <span className="font-thin text-gray-400 text-xs">
                Last 7 days
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10   w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">
                Stores
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {0}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Last 7 days
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    $2000
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Revenue
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-purple-600 text-base">
                Top Selling
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    5
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Last 7 days
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    $1500
                  </span>
                  <span className="font-thin text-gray-400 text-xs">Cost</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">
                Low Stocks
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    12
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Ordered
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    2
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Not in Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Invoice
            isDownload={download}
            discountRate={current.discountPercentage}
            invoiceDetails={current}
            products={current.items}
            key={current}
            shopDetails={{
              name: "Basanti Medical",
              address: "Debra",
              phone: "+91-9732641676",
              email: "NA",
              gstin: "NA",
            }}
            taxRate={current.taxPercentage}
          />
        </Modal>

        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Bills</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md  ">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here by customer name"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  style={{
                    width: "20em",
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={handleAddEntry}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add New Bill
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Customer Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Phone Number
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Items & Quantity
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredData.map((element, index) => {
                console.group(element)
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.customerName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.customerPhone}
                    </td>
                    <td className="whitespace-pre-wrap px-4 py-2 text-gray-700">
                      {element.items.map((item, index) => (
                        <div key={index}>
                          {item.name} - {item.quantity} pcs @ {item.price} each
                        </div>
                      ))}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.finalPrice}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-2 ${
                        element.status === "Paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {element.status}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => {
                          setIsModalOpen(true);
                          // setDownload(true);
                          setCurrent(element);
                        }}
                      >
                        Download
                      </span>
                      <span
                        className="text-blue-600 px-2 cursor-pointer"
                        onClick={() => {
                          setIsModalOpen(true);
                          setDownload(false);
                          setCurrent(element);
                        }}
                      >
                        Show
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicalBillingTable;
