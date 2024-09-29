import React, { useState, useEffect } from "react";
import ProductService from "../../services/auth.service";
import Swal from "sweetalert2";
import { useAuthContext } from "../../contexts/auth.context";
import { Link } from "react-router-dom";
import ProductSearch from "../../component/Pd";

const Dashboard = () => {
  const [products, setProducts] = useState([]); 
  const [filteredResults, setFilteredProducts] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("all"); 
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProducts();
        if (response.status === 200) {
          setProducts(response.data);
          setFilteredProducts(response.data); 
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    fetchProducts();
  }, []);

  
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products); 
    } else {
      const result = products.filter((product) =>
        product.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(result);
    }
  };
  
  return (
    <div className="flex flex-1">
      <Sidebar filterByCategory={filterByCategory} />
      <div className="flex-1 p-4 bg-gray-100 relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Product Dashboard</h1>
          <ProductSearch
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
        </div>
        {user &&
          (user.roles.includes("ROLE_ADMIN") ||
            user.roles.includes("ROLES_MODERATOR")) && (
            <Link to="/AddProduct" className="btn btn-primary fixed bottom-4 right-4 z-20">
              Add Product
            </Link>
          )}
      </div>
    </div>
  );
};

export default Dashboard;