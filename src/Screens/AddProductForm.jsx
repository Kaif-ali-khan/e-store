import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../Components/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions

const AddProductForm = () => {
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const productTitleInput = (e) => setProductTitle(e.target.value);
  const productDescriptionInput = (e) => setProductDescription(e.target.value);
  const productPriceInput = (e) => setProductPrice(Number(e.target.value));
  const productQuantityInput = (e) =>
    setProductQuantity(Number(e.target.value));

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const addProductBtn = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      let imageUrl = "";

      // Upload image if one is selected
      if (imageFile) {
        const imageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile); // Upload the file
        imageUrl = await getDownloadURL(imageRef); // Get the file URL
        console.log("imageUrl", imageUrl)
      }

      let saveDoc = await addDoc(collection(db, "Products"), {
        title: productTitle,
        description: productDescription,
        price: productPrice,
        quantity: productQuantity,
        imageUrl: imageUrl, // Save the image URL
      });
      console.log("Document written with ID: ", saveDoc?.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <h1 className="max-w-sm ml-20 mt-5 text-3xl font-semibold">Add Product Form</h1>
      <form className="max-w-sm ml-20 mt-5" onSubmit={addProductBtn}>
        <div className="mb-5">
          <label
            htmlFor="productTitle"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Title
          </label>
          <input
            type="text"
            id="productTitle"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={productTitleInput}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="productDescription"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Description
          </label>
          <textarea
            id="productDescription"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={productDescriptionInput}
          ></textarea>
        </div>

        <div className="mb-5">
          <label
            htmlFor="productPrice"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Price
          </label>
          <input
            type="number"
            id="productPrice"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={productPriceInput}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="productQuantity"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Quantity
          </label>
          <input
            type="number"
            id="productQuantity"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            onChange={productQuantityInput}
          />
        </div>

        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProductForm;
