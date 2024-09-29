import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { useProduct } from "../contexts/financial.context"; 

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    imageUrl: "",
    category: "",
    stock: "",         
    description: "",   
  });

  const { addProduct } = useProduct();
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(product);
      Swal.fire({
        title: "Add Product",
        text: "Add Successfully",
        icon: "success",
      });
      setProduct({
        name: "",
        brand: "",
        price: "",
        imageUrl: "",
        category: "",
        stock: "",
        description: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Add Product",
        text: error.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="w-1/2 max-w-md">
        <h1 className="text-2xl text-center mb-6"> Add Product </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <span className="w-full"> Product Name </span>
              <input
                type="text"
                name="name"
                className="w-full text-sm"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <span className="w-full"> Brand </span>
              <input
                type="text"
                name="brand"
                className="w-full text-sm"
                placeholder="Brand"
                value={product.brand}
                onChange={handleChange}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <span className="w-full"> Price </span>
              <input
                type="number"
                name="price"
                className="w-full text-sm"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </label>
            
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <span className="w-full"> Category </span>
              <select
                name="category"
                className="w-full text-sm"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value=""> Select Category </option>
                <option value="Pc"> PC </option>
                <option value="Laptop"> Laptop </option>
                <option value="Phone"> Phone </option>
                <option value="Tablet"> Tablet </option>
              </select>
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-4">
              <span className="w-full"> Image URL </span>
              <input
                type="text"
                name="imageUrl"
                className="w-full text-sm"
                placeholder="Image URL"
                value={product.imageUrl}
                onChange={handleChange}
              />
            </label>
            
            <label className="input input-bordered flex items-center gap-2 mb-4">
              <span className="w-full"> Stock </span>
              <input
                type="number"
                name="stock"
                className="w-full text-sm"
                placeholder="Stock"
                value={product.stock}
                onChange={handleChange}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-4">
              <span className="w-full"> Description </span>
              <textarea
                name="description"
                className="w-full text-sm"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
              />
            </label>

            {product.imageUrl && (
              <div className="flex items-center justify-center mb-4">
                <img
                  src={product.imageUrl}
                  className="h-16 object-cover"
                  alt="Product"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end mr-3">
            <button type="submit" className="btn btn-outline btn-success mr-2">
              Add Product
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-outline btn-warning">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;