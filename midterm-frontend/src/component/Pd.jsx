import React, { useState, useEffect } from "react";

const ProductSearch = ({ products, setFilteredProducts }) => {
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    if (searchItem === "") {
      setFilteredProducts(products);
      return;
    }

    const filteredResults = products.filter((item) => {
      const itemName = item.name ? item.name.toLowerCase() : "";
      const itemCategory = item.category ? item.category.toLowerCase() : "";
      const itemBrand = item.brand ? item.brand.toLowerCase() : "";
      const itemDescription = item.description ? item.description.toLowerCase() : "";
      const searchQuery = searchItem.toLowerCase();

      return (
        itemName.includes(searchQuery) ||
        itemCategory.includes(searchQuery) ||
        itemBrand.includes(searchQuery) ||
        itemDescription.includes(searchQuery)
      );
    });

    setFilteredProducts(filteredResults);
  }, [searchItem, products, setFilteredProducts]);

  const handleInputChange = (event) => {
    setSearchItem(event.target.value);
  };

  return (
    <label className="input input-bordered flex items-center gap-2 w-5/6">
      <input
        type="text"
        className="grow"
        placeholder="Search for products"
        onChange={handleInputChange}
        value={searchItem}
        aria-label="Search for products"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M10 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm1 0a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM11.5 11a.5.5 0 0 1-.5-.5v-1a1.5 1.5 0 0 0-3 0v1a.5.5 0 1 1-1 0v-1a2.5 2.5 0 0 1 5 0v1a.5.5 0 0 1-.5.5Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

export default ProductSearch;
