import React, { useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PharmacyInvoice = ({
  shopDetails = {},
  invoiceDetails = {},
  products = [],
  taxRate = 0,
  discountRate = 0,
  isDownload,
}) => {
  const downloadInvoiceAsPDF = () => {
    const invoice = document.getElementById("invoice");

    html2canvas(invoice, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20; // Padding of 10mm on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0;

      if (imgHeight <= pdfHeight - 20) {
        // If content fits within a single page
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      } else {
        while (position < imgHeight) {
          pdf.addImage(imgData, "PNG", 10, 10 - position, imgWidth, imgHeight);
          position += pdfHeight - 20; // Move to the next page with padding
          if (position < imgHeight) pdf.addPage();
        }
      }

      pdf.save(`invoice_${Date.now()}.pdf`);
    });
  };

  // Calculations
  const totalBeforeTax = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const discount = (totalBeforeTax * discountRate) / 100;
  const taxAmount = ((totalBeforeTax - discount) * taxRate) / 100;
  const totalAmount = totalBeforeTax + taxAmount - discount;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg max-h-full m-8">
      {true && (
        <button
          onClick={downloadInvoiceAsPDF}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Download PDF
        </button>
      )}
      <div id="invoice">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold uppercase">{shopDetails.name}</h1>
          <p>{shopDetails.address}</p>
          <p>
            Phone: {shopDetails.phone} | Email: {shopDetails.email}
          </p>
          <p>GSTIN: {shopDetails.gstin ? shopDetails.gstin : "NA"}</p>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-semibold">Invoice</h2>
          <div className="flex justify-between mt-2">
            <div>
              <p>
                <strong>Invoice No:</strong> {invoiceDetails.invID}
              </p>
              <p>
                <strong>Date:</strong> {invoiceDetails.date}
              </p>
            </div>
            <div>
              <p>
                <strong>Billed To:</strong>
                <br></br>
                {invoiceDetails.customerName}
                <br></br>
                (+91-{invoiceDetails.customerPhone})
              </p>
              <p>{invoiceDetails.customerAddress}</p>
              <p>GSTIN: {invoiceDetails.gstin ? invoiceDetails.gstin : "NA"}</p>
            </div>
          </div>
        </section>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Sl. No.</th>
              <th className="border px-4 py-2">Description of Goods</th>
              <th className="border px-4 py-2">HSN Code</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Unit Price (₹)</th>
              <th className="border px-4 py-2">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.hsnCode}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">{product.price.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  {(product.price * product.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <section className="mt-8">
          <div className="flex justify-end">
            <table className="w-full max-w-sm text-right">
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Subtotal</td>
                  <td className="border px-4 py-2">
                    ₹{totalBeforeTax.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    Discount ({discountRate.toFixed(0)}%)
                  </td>
                  <td className="border px-4 py-2">-₹{discount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">
                    GST ({taxRate.toFixed(0)}%)
                  </td>
                  <td className="border px-4 py-2">₹{taxAmount.toFixed(2)}</td>
                </tr>

                <tr>
                  <td className="border px-4 py-2 font-semibold">Total</td>
                  <td className="border px-4 py-2 font-semibold">
                    ₹{totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-8 text-center">
          <p className="text-sm">Thank you for shopping with us!</p>
          <p className="text-sm mb-2">
            This is a computer-generated invoice and does not require a
            signature.
          </p>
          <p className="text-sm mb-2"></p>
          <p className="text-sm mb-2"></p>
        </footer>
      </div>
    </div>
  );
};

export default PharmacyInvoice;
