import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddProduct from "../AddProduct";
import AuthContext from "../../AuthContext";

// Mocking the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe("AddProduct Component", () => {
  const mockAddProductModalSetting = jest.fn();
  const mockHandlePageUpdate = jest.fn();

  const renderComponent = () => {
    const authContextValue = { user: "123" };

    return render(
      <AuthContext.Provider value={authContextValue}>
        <AddProduct
          addProductModalSetting={mockAddProductModalSetting}
          handlePageUpdate={mockHandlePageUpdate}
        />
      </AuthContext.Provider>
    );
  };

  it("renders the modal with inputs", () => {
    renderComponent();

    expect(screen.getByText("Add Product")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Manufacturer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  it("handles input change events", () => {
    renderComponent();

    const nameInput = screen.getByLabelText(/Name/i);
    const manufacturerInput = screen.getByLabelText(/Manufacturer/i);
    const descriptionInput = screen.getByLabelText(/Description/i);

    fireEvent.change(nameInput, { target: { value: "Test Product" } });
    fireEvent.change(manufacturerInput, {
      target: { value: "Test Manufacturer" },
    });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });

    expect(nameInput.value).toBe("Test Product");
    expect(manufacturerInput.value).toBe("Test Manufacturer");
    expect(descriptionInput.value).toBe("Test Description");
  });

  it("triggers addProduct function on Add Product button click", async () => {
    renderComponent();

    const addProductButton = screen.getByText(/Add Product/i);

    fireEvent.click(addProductButton);

    // Wait for the mock fetch to be called
    expect(global.fetch).toHaveBeenCalledWith(
      "https://deft-malabi-bdc9a1.netlify.app/.netlify/functions/index/api/product/add",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-type": "application/json" },
      })
    );

    // Check that the handlePageUpdate and addProductModalSetting are called
    expect(mockHandlePageUpdate).toHaveBeenCalled();
    expect(mockAddProductModalSetting).toHaveBeenCalled();
  });

  it("closes the modal on Cancel button click", () => {
    renderComponent();

    const cancelButton = screen.getByText(/Cancel/i);

    fireEvent.click(cancelButton);

    // Ensure the modal close function is called
    expect(mockAddProductModalSetting).toHaveBeenCalled();
  });
});
