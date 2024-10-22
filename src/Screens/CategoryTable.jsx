import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase";
import Loader from "../Assets/svg/loader";
import Toast from "../Assets/svg/toast";
import NavBar from "../Components/NavBar";
import Button from "../Components/Button";
import { CATEGORIES_FORM } from "../Utils/constants";
import { useNavigate } from "react-router-dom";

const CategoryTable = () => {
  const navigate = useNavigate();
  const [categoryTable, setCategoryTable] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    categoryTableData();
  }, []);

  const categoryTableData = async () => {
    try {
      const data = await getDocs(collection(db, "Categories"));
      const pdata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCategoryTable(pdata);
      console.log("pdata", pdata);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      setErrorMessage(true);
    }
  };

  //   const handleEdit = (id) => {
  //     navigate(CATEGORIES_FORM(id));
  //   };

  const handleDelete = async () => {
    try {
      setShowLoader(true);
      await deleteDoc(doc(db, "Categories", deletingCategoryId));
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
    setDeletingCategoryId();
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

      <NavBar />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center"></div>
              </th>
              <th scope="col" className="px-6 py-3">
                Product Category
              </th>
              <th scope="col" className="px-6 py-3">
                Active
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3">
                Updated By
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categoryTable?.length
              ? categoryTable?.map((data) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">
                        <div className="flex items-center"></div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data?.name}
                      </th>
                      <td className="px-6 py-4">{data?.isActive}</td>
                      <td className="px-6 py-4">{new Date(data?.createdAt).toString()}</td>
                      <td className="px-6 py-4">{data?.updatedAt}</td>
                      <td className="px-6 py-4">{data?.updatedBy}</td>
                      <td className="px-6 py-4">
                        <Button
                          // onClick={() => handleEdit(data.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          text="Edit"
                        />

                        <Button
                          onClick={() => {
                            openModal();
                            setDeletingCategoryId(data.id);
                          }}
                          className="font-medium text-red-600 dark:text-blue-500 hover:underline ml-5"
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

      {/* Modal Component */}
      {isModalOpen ? ( // Render modal if isModalOpen is true
        <div
          className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg p-4 w-96">
            <div className="flex justify-between items-center">
              <h3 id="modal-title" className="text-lg font-bold">
                Confirmation
              </h3>
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

export default CategoryTable;
