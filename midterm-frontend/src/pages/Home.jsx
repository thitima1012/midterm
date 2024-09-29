import React, { useState, useEffect, startTransition } from "react";
import Swal from "sweetalert2";
import Search from "../component/Pd";
import { useAuthContext } from "../contexts/auth.context";

const Home = () => {
  const { user } = useAuthContext();
  const [products, setProduct] = useState([]);
  const [filteredResults, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await ProductService.getAllProduct();
        console.log(response.data);
        if (response.status === 200) {
          startTransition(() => {
            setProduct(response.data);
            setFilteredProducts(response.data);
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Product",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    getProduct();
  }, []);

  return (
    <div>
      {user ? (
        <div className="container flex flex-row flex-wrap w-full items-center justify-center">
        <Search products={products} setFilterProducts={setFilteredProducts} />
        <Bookshelf products={filteredResults} />
      </div>
      ) : (
        <div className="text-4xl mb-4 font-bold">Please login</div>
      )}
    </div>
  );
};

export default Home;