import Loader from "../Assets/svg/loader";
import { Link } from "react-router-dom";
import { PRODUCTDETAILS_PATH } from "../Utils/constants";
import Button from "../Components/Button";
import CategoriesBtn from "../Components/CategoriesBtn";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebase";
import { useLazyGetProductsQuery } from "../features/api/productApi";
import Footer from "../Components/Footer";

const Home = () => {
  const [getProducts, { data: productsData, error, isLoading }] =
    useLazyGetProductsQuery();

  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();

  const getCategories = async () => {
    const data = await getDocs(collection(db, "Categories"));
    const categories = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setCategories(categories);
    console.log("btnCategories", categories);
  };

  useEffect(() => {
    getCategories();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const productGet = await getProducts();
    setProducts(productGet?.data);
  };
  console.log("Products", products);

  const filterCategories = (categoryId) => {
    const categoriesFilter = productsData?.filter((data) => {
      console.log("data", data);

      return data.categoryId === categoryId;
    });
    console.log("categoryId", categoryId);
    setProducts([...categoriesFilter]);
    console.log("categoriesFilter", categoriesFilter);
  };

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
      <div className="w-full flex justify-center mt-14 gap-5 m-auto flex-wrap p-5">
        <CategoriesBtn text="All" onClick={fetchProducts} />
        {categories?.map((data) => (
          <CategoriesBtn
            text={data?.name}
            onClick={() => filterCategories(data?.id)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10 m-8">
        {products?.length ? (
          products?.map((card) => (
            <div
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              key={card.id}
            >
              <Link to={PRODUCTDETAILS_PATH(card.id)}>
                <img className="p-8 rounded-t-lg w-44" src={card.imageUrl} />
              </Link>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white whitespace-nowrap w-[200px] overflow-hidden text-ellipsis m-5">
                    {card.title}
                  </h5>
                </a>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {card.price}
                  </span>
                  <Button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    text="Add To Cart"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No Products in this category</h1>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
