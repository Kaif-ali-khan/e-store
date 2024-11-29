import {
  collection,
  where,
  query,
  documentId,
  getDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase";
import { useSelector } from "react-redux";
import Button from "../Components/Button";

const CartPage = () => {
  const userId = useSelector((state) => state?.login?.user?.id);
  console.log("userId", userId);
  const [cartData, setCartData] = useState();
  console.log("cartData", cartData);
  const [showLoader, setShowLoader] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    const docRef = doc(db, "Carts", userId);
    const docSnap = await getDoc(docRef);
    const cData = docSnap.data();
    console.log("cData", cData);

    const cartItems = cData?.items;
    console.log("cartItems", cartItems);
    const productIds = cartItems?.map((data) => data?.productId) || [];

    if (productIds.length > 0) {
      const productsRef = query(
        collection(db, "Products"),
        where(documentId(), "in", productIds)
      );

      const productsDocsSnap = await getDocs(productsRef);
      const products = productsDocsSnap.docs.map((productDocsnap) => {
        const data = productDocsnap.data();
        return { ...data, id: productDocsnap.id };
      });

      console.log("products", products);
      const finalItems = cData?.items?.map((data) => {
        const product = products.find((d) => data.productId === d.id);
        return { ...product, ...data };
      });
      console.log("finalItems", finalItems);

      const obj = {
        ...cData,
        items: finalItems,
      };
      setCartData(obj);
      console.log("obj", obj);
    } else {
      console.log("No product IDs available to query.");
      setCartData(cData);
    }
  };

  const removeProduct = async () => {
    try {
      setShowLoader(true);
      const itemsAfterDeletingProduct = cartData?.items?.filter(
        (d) => d.id !== deletingProductId
      );
      const obj = {
        ...cartData,
        items: itemsAfterDeletingProduct,
      };

      const cartsRef = doc(db, "Carts", userId);
      await updateDoc(cartsRef, obj);

      setShowLoader(false);
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setDeletingProductId();
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Total-Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cartData?.items?.length ? (
            cartData?.items?.map((data) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {data?.title}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {data?.quantity}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {data?.price}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {data?.subTotal}
                </td>
                <td className="px-6 py-4">
                  <Button
                    onClick={() => {
                      openModal();
                      setDeletingProductId(data.productId);
                    }}
                    className="font-medium text-red-600 dark:text-blue-500 hover:underline ml-2"
                    text="Remove"
                  />
                </td>
              </tr>
            ))
          ) : (
            <h1>No Products in this category</h1>
          )}
        </tbody>
      </table>

      {/* Modal Component */}
      {isModalOpen ? (
        <div
          className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg p-4 w-11/12 md:w-96">
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
                onClick={() => removeProduct()}
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

export default CartPage;
