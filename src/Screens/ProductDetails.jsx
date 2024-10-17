import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Assets/svg/loader";
import NavBar from "../Components/NavBar";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../Components/firebase";
import { useGetSingleProductQuery } from "../features/api/productApi";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);

  const {
    data: singleProduct,
    error,
    isLoading,
  } = useGetSingleProductQuery(id);

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

  // const [singleProduct, setSingleProduct] = useState();
  // const [showLoader, setShowLoader] = useState(true);

  // useEffect(() => {
  //   // getSingleData();
  //   getFirebaseSingleProductDetails();
  // }, []);

  // const getFirebaseSingleProductDetails = async () => {
  //   try {
  //     const docRef = doc(db, "Products", id);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       console.log("Document data:", setSingleProduct(docSnap.data()));
  //     } else {
  //       console.log("No such document!");
  //     }

  //     setShowLoader(false);
  //   } catch (error) {
  //     console.log(error)
  //     setShowLoader(false);
  //   }
  // };

  // const getSingleData = async () => {
  //   try {
  //     let api = await axios.get(`https://fakestoreapi.com/products/${id}`);
  //     let data = api.data;
  //     setShowLoader(false);
  //     let updateObject = {
  //       ...data,
  //       roundedRating: Math.round(data.rating.rate),
  //     };
  //     setSingleProduct(updateObject);
  //     console.log("data", data);
  //   } catch (err) {
  //     console.log("err", err);
  //     setShowLoader(false);
  //   }
  // };

  // let numberOfSvgsArray = singleProduct?.rating.rate
  //   ? new Array(singleProduct?.roundedRating).fill(0)
  //   : [];
  // console.log("showSvg", numberOfSvgsArray);

  return (
    <>
      <NavBar />
      {/* {showLoader ? (
        <div
          role="status"
          className="flex flex-row min-h-screen justify-center items-center"
        >
          <Loader />
          <span className="sr-only">Loading...</span>
        </div>
      ) : null} */}

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
                {/* <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                  <img
                    src="https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="Thumbnail 1"
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={changeImage(this.src)}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="Thumbnail 2"
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={changeImage(this.src)}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="Thumbnail 3"
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={changeImage(this.src)}
                  />
                  <img
                    src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                    alt="Thumbnail 4"
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={changeImage(this.src)}
                  />
                </div> */}
              </div>

              <div className="w-full md:w-1/2 px-4">
                <h2 className="text-3xl font-bold mb-2">
                  {singleProduct?.title}
                </h2>
                {/* <p className="text-gray-600 mb-4">{singleProduct?.category}</p> */}
                <div className="mb-4">
                  <span className="text-2xl font-bold mr-2">
                    ${singleProduct?.price}
                  </span>
                </div>
                {/* <div className="flex items-center mb-4">
                  {numberOfSvgsArray?.map(() => {
                    return (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-yellow-500"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    );
                  })}

                  <span className="ml-2 text-gray-600">
                    {singleProduct?.roundedRating}
                  </span>
                </div> */}
                <p className="text-gray-700 mb-6">
                  {singleProduct?.description}
                </p>

                <div className="flex space-x-4 mb-6">
                  <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        trokelinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    Add to Cart
                  </button>
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
