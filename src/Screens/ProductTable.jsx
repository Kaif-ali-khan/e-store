import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Loader from "../Assets/svg/loader";
import { useNavigate } from "react-router-dom";
import { ADDPRODUCT_FORM, PRODUCT_FORM } from "../Utils/constants";
import Toast from "../Assets/svg/toast";
import Button from "../Components/Button";
import { db } from "../Config/firebase";

const ProductTable = () => {
  const navigate = useNavigate();
  const [productTable, setProductTable] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [categoryData, setCategoryData] = useState();

  useEffect(() => {
    fetchProductAndCategoryData();
  }, []);

  const fetchProductAndCategoryData = async () => {
    try {
      setShowLoader(true); // Show loader before starting the fetch

      const [productData, categoryData] = await Promise.all([
        getDocs(collection(db, "Products")),
        getDocs(collection(db, "Categories")),
      ]);

      const products = productData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const categories = categoryData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProductTable(products);
      setCategoryData(categories);

      setShowLoader(false); // Hide loader after data is fetched
    } catch (error) {
      setShowLoader(false); // Hide loader if there's an error
      setErrorMessage(true); // Show error message
    }
  };

  const handleEdit = (id) => {
    navigate(PRODUCT_FORM(id));
  };

  const handleDelete = async () => {
    try {
      setShowLoader(true);
      await deleteDoc(doc(db, "Products", deletingProductId));
      console.log("record deleted");
      setShowLoader(false);
      setModalOpen(false);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(true);
    }
  };

  const openModal = () => setModalOpen(true); // Function to open modal
  const closeModal = () => {
    setModalOpen(false);
    setDeletingProductId();
  };

  const openAddProductForm = () => {
    navigate(ADDPRODUCT_FORM);
  };

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

      {errorMessage ? <Toast /> : null}

      <div className="w-11/12 lg:w-5/6 mx-auto flex-nowrap">
        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Products</h1>
          <Button
            className="w-full md:w-auto text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-around"
            text="Add Products"
            onClick={openAddProductForm}
          />
        </div>

        <div className="shadow-md sm:rounded-lg mt-8 mx-auto overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-2 md:px-6 py-3">Product Title</th>
                <th scope="col" className="px-2 md:px-6 py-3">Description</th>
                <th scope="col" className="px-2 md:px-6 py-3">Category</th>
                <th scope="col" className="px-2 md:px-6 py-3">Price</th>
                <th scope="col" className="px-2 md:px-6 py-3">Quantity</th>
                <th scope="col" className="px-2 md:px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {productTable?.length
                ? productTable?.map((data) => {
                    const category = categoryData?.find(
                      (category) => category.id === data.categoryId
                    );
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4"></td>
                        <th
                          scope="row"
                          className="px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {data?.title}
                        </th>
                        <td className="px-2 md:px-6 py-4">{data?.description}</td>
                        <td className="px-2 md:px-6 py-4">{category?.name}</td>
                        <td className="px-2 md:px-6 py-4">{data?.price}</td>
                        <td className="px-2 md:px-6 py-4">{data?.quantity}</td>
                        <td className="px-2 md:px-6 py-4 whitespace-nowrap space-x-2">
                          <Button
                            onClick={() => handleEdit(data.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            text="Edit"
                          />
                          <Button
                            onClick={() => {
                              openModal();
                              setDeletingProductId(data.id);
                            }}
                            className="font-medium text-red-600 dark:text-blue-500 hover:underline ml-2"
                            text="Remove"
                          />
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen ? (
        <div
          className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg p-4 w-11/12 md:w-96">
            <div className="flex justify-between items-center">
              <h3 id="modal-title" className="text-lg font-bold">Confirmation</h3>
              <Button onClick={closeModal} className="text-gray-500" text="x" />
            </div>
            <div className="mt-4">
              <p>Are you sure you want to delete?</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={closeModal}
                className="py-2 px-4 bg-gray-200 rounded mr-2"
                text="Close"
              />
              <Button
                onClick={() => handleDelete()}
                className="py-2 px-4 bg-red-600 text-white rounded flex gap-3"
                showLoader={showLoader}
                text="Delete"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductTable;
