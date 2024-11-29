import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../features/api/productApi";
import { useGetCategoriesQuery } from "../features/api/categoriesApi";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import { PRODUCTDETAILS_PATH } from "../Utils/constants";

const Home = () => {
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery();
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const searchQuery = useSelector((state) => state.products.searchQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (productsLoading || categoriesLoading) return <h1>Loading...</h1>;
  if (productsError || categoriesError) return <h1>Error loading data</h1>;

  const filteredProducts = productsData?.filter((product) => {
    console.log("product", product);
    const matchesCategory =
      selectedCategory === "All" || product.categoryId === selectedCategory;
    console.log("selectedCategory", selectedCategory);
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  console.log("filteredProducts", filteredProducts);

  return (
    <div className="m-8">
      {/* Categories Section */}
      <div className="flex justify-center gap-4 mb-8">
        {/* All Category */}
        <button
          className={`px-4 py-2 ${
            selectedCategory === "All"
              ? "bg-blue-700 text-white"
              : "bg-blue-500 text-white"
          } rounded`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>

        {/* Render Category Buttons */}
        {categoriesData?.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 ${
              selectedCategory === category.name
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white"
            } rounded`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Display Filtered Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {!filteredProducts?.length ? (
          <p>No products found for this category or search term.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-full max-w-sm bg-white border rounded-lg shadow"
            >
              <Link to={PRODUCTDETAILS_PATH(product.id)}>
                <img
                  className="p-8 rounded-t-lg w-44"
                  src={product.imageUrl}
                  alt={product.title}
                />
              </Link>
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold">{product.title}</h5>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{product.price}</span>
                  <Button
                    text="Add To Cart"
                    className="w-50 text-white bg-blue-500 hover:bg-blue-600 font-semibold rounded-lg text-sm px-5 py-2.5"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
