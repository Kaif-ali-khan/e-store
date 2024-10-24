import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Assets/svg/loader";
import NavBar from "../Components/NavBar";
import { useGetSingleProductQuery } from "../features/api/productApi";
import Button from "../Components/Button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

const ProductDetails = () => {
  const { id } = useParams();
  // const [categoryName, setCategoryName] = useState("");

  const {
    data: singleProduct,
    error,
    isLoading,
  } = useGetSingleProductQuery(id);

  // useEffect(() => {
  //   if (singleProduct) {
  //     categoryGetData(singleProduct.categoryId);
  //   }
  // }, [singleProduct]);

  // const categoryGetData = async (id) => {
  //   try {
      
  //       setCategoryName();

  //   } catch (error) {
  //     console.log("error from  categoryGetData", error);
  //   }
  // };

  if (isLoading) {
    return (
      <div
        role="status"
        className="flex flex-row min-h-screen justify-center items-center"
      >
        <Loader />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <>
      <NavBar />

      {singleProduct ? (
        <div className="bg-white-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-8">
                <img
                  src={singleProduct?.imageUrl}
                  alt="Product"
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                  id="mainImage"
                />
              </div>

              <div className="w-full md:w-1/2 px-4">
                <h2 className="text-3xl font-bold mb-2">
                  {singleProduct?.title}
                </h2>

                <div className="mb-4">
                  <span className="text-2xl font-bold mr-2">
                    {singleProduct?.categoryData?.name}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-bold mr-2">
                    ${singleProduct?.price}
                  </span>
                </div>

                <p className="text-gray-700 mb-6">
                  {singleProduct?.description}
                </p>

                <div className="flex space-x-4 mb-6">
                  <Button
                    className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    text="Add to Cart"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductDetails;
