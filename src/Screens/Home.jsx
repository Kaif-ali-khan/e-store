import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Assets/svg/loader";
import { Link } from "react-router-dom";
import { PRODUCTDETAILS_PATH } from "../Utils/constants";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Components/firebase";

const Home = () => {
  const [productsData, setProductsData] = useState([]);
  const [showMessage, setshowMessage] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // getData();
    getFirebaseData();
  }, []);

  const getFirebaseData = async () => {
    try {
      const data = await getDocs(collection(db, "Products"));
      const pdata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProductsData(pdata);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
    }
  };

  // const getData = async () => {
  //   try {
  //     let api = await axios.get("https://fakestoreapi.com/products");
  //     setShowLoader(false);
  //     let data = api.data;
  //     setProductsData(data);
  //   } catch (err) {
  //     console.log("err", err);
  //     setshowMessage(true);
  //     setShowLoader(false);
  //   }
  // };

  return (
    <>
      {showLoader ? (
        <div
          role="status"
          className="flex flex-row min-h-screen justify-center items-center"
        >
          <Loader />
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10 m-8">
        {productsData?.length
          ? productsData?.map((card) => (
              <div
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                key={card.id}
              >
                <Link to={PRODUCTDETAILS_PATH(card.id)}>
                  <img className="p-8 rounded-t-lg w-40" src={card.imageUrl} />
                </Link>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {card.title}
                    </h5>
                  </a>
                  {/* <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      5.0
                    </span>
                  </div> */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {card.price}
                    </span>
                    <a
                      href="#"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>

      {showMessage ? <p>Something went Wrong</p> : null}
    </>
  );
};

export default Home;
