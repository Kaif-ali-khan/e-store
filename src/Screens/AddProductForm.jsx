import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../Components/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import { useParams } from "react-router-dom";
import Loader from "../Assets/svg/loader";
import Toast from "../Assets/svg/toast";

const AddProductForm = () => {
  const [productTitle, setProductTitle] = useState("abc");
  const [productDescription, setProductDescription] = useState("abc");
  const [productPrice, setProductPrice] = useState(88);
  const [productQuantity, setProductQuantity] = useState(88);
  const [imageFile, setImageFile] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const { id } = useParams();
  // console.log(id);

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
      setShowLoader(true);
      let imageUrl = "";

      // Upload image if one is selected
      if (imageFile) {
        const imageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile); // Upload the file
        imageUrl = await getDownloadURL(imageRef); // Get the file URL
        console.log("imageUrl", imageUrl);
      }

      let saveDoc = await addDoc(collection(db, "Products"), {
        title: productTitle,
        description: productDescription,
        price: productPrice,
        quantity: productQuantity,
        imageUrl: imageUrl, // Save the image URL
      });
      console.log("Document written with ID: ", saveDoc?.id);
      setShowLoader(false);
    } catch (error) {
      console.log("Error", error);
      setShowLoader(false);
      setErrorMessage(true);
    }
  };

  const updateProduct = async () => {
    try {
      setShowLoader(true);
      let imageUrl = "";

      // Upload image if one is selected
      if (imageFile) {
        const imageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile); // Upload the file
        imageUrl = await getDownloadURL(imageRef); // Get the file URL
        console.log("imageUrl", imageUrl);
      }

      let docUpdate = await updateDoc(doc(db, "Products", id), {
        title: productTitle,
        description: productDescription,
        price: productPrice,
        quantity: productQuantity,
        imageUrl: imageUrl,
      });

      console.log("updateDoc", docUpdate);
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      setShowLoader(false);
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    getFirebaseValue();
  }, []);

  const getFirebaseValue = async () => {
    try {
      if (id) {
        const docRef = doc(db, "Products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("docSnap", docSnap.data());
          setProductTitle(docSnap.data().title);
          setProductDescription(docSnap.data().description);
          setProductPrice(docSnap.data().price);
          setProductQuantity(docSnap.data().quantity);
          setImageFile(docSnap.data().imageUrl);
          console.log("Document data:");
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      {errorMessage ? <Toast /> : null}
      <h1 className="max-w-sm ml-20 mt-5 text-3xl font-semibold">
        {id ? "Edit Product" : "Add Product"}
      </h1>
      <form
        className="max-w-sm ml-20 mt-5"
        onSubmit={id ? updateProduct : addProductBtn}
      >
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
            value={productTitle}
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
            value={productDescription}
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
            value={productPrice}
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
            value={productQuantity}
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-5"
        >
          {id ? "Edit Product" : "Add Product"}
          {showLoader ? (
            <div role="status">
              <Loader />
              <span className="sr-only">Loading...</span>
            </div>
          ) : null}
        </button>
      </form>
    </>
  );
};

export default AddProductForm;
