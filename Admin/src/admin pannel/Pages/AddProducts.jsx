import { Input } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

function AddProducts() {

  const [product, setProduct] = useState({
    itemName: "",
    price: "",
    description: "",
  });

  const [file, setFile] = useState();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("itemImage", file);
    formData.append("itemName", product.itemName);
    formData.append("price", product.price);
    formData.append("description", product.description);

    const response = await axios.post(
      "http://localhost:4000/api/items/addItem",
      formData
    );

    setProduct({
      itemName: "",
      price: "",
      description: "",
    });
    toast("product added");
  };

  return (
    <div>
      <h1 className="mb-5">Add Coffee</h1>
      <div>
        <Input
          className="mb-5"
          type="text"
          placeholder="Coffee Name"
          name="itemName"
          value={product.itemName}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              itemName: e.target.value,
            }))
          }
        />

        <Input
          className="mb-5"
          type="number"
          value={product.price}
          placeholder="Enter Coffee Price"
          onChange={(e) => {
            setProduct((prev) => ({ ...prev, price: e.target.value }));
          }}
        />
        <Input
          className="mb-5"
          type="file"
          placeholder="Enter Image name"
          name="itemImage"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        <Input
          className="mb-5"
          type="text"
          placeholder="Enter description"
          name="description"
          value={product.description}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        <button
          style={{
            margin: "10px",
            backgroundColor: "skyblue",
            padding: "10px",
            border: "solid",
            borderColor: "aliceblue",
            borderRadius: "10px",
          }}
          type="submit"
          onClick={handleSubmit}
        >
          Add Coffee
        </button>
      </div>
    </div>
  );
}

export default AddProducts;
