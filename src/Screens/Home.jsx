import Loader from "../Assets/svg/loader";
import { Link } from "react-router-dom";
import { PRODUCTDETAILS_PATH } from "../Utils/constants";
import { useGetProductsQuery } from "../features/api/productApi";
import Button from "../Components/Button";

const Home = () => {
  const { data: productsData, error, isLoading } = useGetProductsQuery();

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
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {card.price}
                    </span>
                    <Button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      text="Add To Cart"
                    />
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default Home;
