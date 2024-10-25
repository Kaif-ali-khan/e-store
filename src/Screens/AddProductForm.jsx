import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../Config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import { useParams } from "react-router-dom";
import Loader from "../Assets/svg/loader";
// import Toast from "../Assets/svg/toast";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Label from "../Components/Label";

const AddProductForm = () => {
  const [productTitle, setProductTitle] = useState("abc");
  const [productDescription, setProductDescription] = useState("abc");
  const [productCategoryId, setProductCategoryId] = useState();
  const [productPrice, setProductPrice] = useState(88);
  const [productQuantity, setProductQuantity] = useState(88);
  const [imageFile, setImageFile] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [categoryData, setCategoryData] = useState();

  const { id } = useParams();
  // console.log(id);

  const productTitleInput = (e) => setProductTitle(e.target.value);
  const productDescriptionInput = (e) => setProductDescription(e.target.value);
  const productCategoryIdInput = (e) => {
    setProductCategoryId(e.target.value);
    console.log("categoryID", productCategoryId);
  };
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
        categoryId: productCategoryId,
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

      const data = {
        title: productTitle,
        description: productDescription,
        categoryId: productCategoryId,
        price: productPrice,
        quantity: productQuantity,
        imageUrl: imageUrl,
      };
      console.log("productData", data);
      let docUpdate = await updateDoc(doc(db, "Products", id), data);

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
    categoryGetData();
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
          setProductCategoryId(docSnap.data().categoryId);
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
  const categoryGetData = async () => {
    try {
      const data = await getDocs(collection(db, "Categories"));
      const pdata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCategoryData(pdata);
      // console.log("pdata", pdata);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      setErrorMessage(true);
    }
  };

  return (
    <>
      <div className="max-w-md ml-20 mt-5">
        <div className="mb-5">
          <Label text="Product Title" />
          <Input
            type={Text}
            onChange={productTitleInput}
            value={productTitle}
          />
        </div>

        <div className="mb-5">
          <Label text="Product Description" />
          <textarea
            id="productDescription"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={productDescriptionInput}
            value={productDescription}
          ></textarea>
        </div>

        <div className="flex gap-5">
          <div className="mb-5">
            <Label text="Categories" />
            <select onChange={productCategoryIdInput} className="border h-10">
              Select
              {categoryData?.map((data) => {
                return <option value={data?.id}>{data?.name}</option>;
              })}
            </select>
          </div>

          <div>
            <Label text="Product Price" />
            <Input
              type={Number}
              onChange={productPriceInput}
              value={productPrice}
            />
          </div>

          <div className="mb-5">
            <Label text="Product Quantity" />
            <Input
              type={Number}
              onChange={productQuantityInput}
              value={productQuantity}
            />
          </div>
        </div>

        <div className="mb-5">
          <Label text="Upload file" />
          <Input type="file" onChange={handleImageChange} />
        </div>

        <Button
          text={id ? "Edit Product" : "Add Product"}
          onClick={id ? updateProduct : addProductBtn}
          showLoader={
            showLoader ? (
              <div role="status">
                <Loader />
                <span className="sr-only">Loading...</span>
              </div>
            ) : null
          }
        />
      </div>
      {/* </form> */}
    </>
  );
};

export default AddProductForm;
