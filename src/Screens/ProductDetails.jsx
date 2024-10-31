import { useParams } from "react-router-dom";
import Loader from "../Assets/svg/loader";
import { useGetSingleProductQuery } from "../features/api/productApi";
import Button from "../Components/Button";
import Label from "../Components/Label";
import Input from "../Components/Input";
import { useState } from "react";
import { useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Config/firebase";

const ProductDetails = () => {
  const { id } = useParams();
  const userId = useSelector((state) => state?.login?.user?.id);
  const [producQuanitity, setProducQuanitity] = useState();
  const [productPrice, setProductPrice] = useState(0);

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

  const addProductQuanity = (e) => {
    const quantity = e.target.value;
    // console.log(e.target.value);
    setProducQuanitity(quantity);

    if (quantity > producQuanitity) {
      setProductPrice(productPrice + singleProduct?.price);
    } else if (quantity < producQuanitity) {
      setProductPrice(productPrice - singleProduct?.price);
    } else {
      setProductPrice(singleProduct?.price);
    }
  };

  const AddToCartFirebase = async () => {
    try {
      const docRef = doc(db, "Carts", userId);
      const docSnap = await getDoc(docRef);
      const singleData = docSnap.data();
      console.log("userID", userId);
      console.log("data", singleData);
      const cartData = {
        userId: userId,
        createdAt: new Date().toISOString(), // Current date or specific date
        items: [
          {
            productId: id,
            quantity: producQuanitity,
            subTotal: productPrice,
          },

          ...(singleData?.items || []),
        ],
      };

      await setDoc(doc(db, "Carts", userId), cartData);
      console.log("Cart added successfully!");
    } catch (error) {
      console.error("Error adding cart: ", error);
    }
  };

  return (
    <>
      {singleProduct ? (
        <div className="bg-white-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-8">
                <img
                  src={singleProduct?.imageUrl}
                  alt="Product"
                  className="w-full h-3/4 object-cover rounded-lg shadow-md mb-4"
                  id="mainImage"
                />
              </div>

              <div className="w-full md:w-1/2 px-4">
                <h2 className="text-3xl font-bold mb-6">
                  {singleProduct?.title}
                </h2>

                <div className="mb-6">
                  <span className="text-2xl font-bold mr-2">
                    {singleProduct?.categoryData?.name}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-bold mr-2">
                    ${productPrice || singleProduct?.price}
                  </span>
                </div>

                <p className="text-gray-700 mb-6">
                  {singleProduct?.description}
                </p>

                <div className="mb-4 w-20 ">
                  <Label text="Quantity" />
                  <Input
                    type={"number"}
                    min={"1"}
                    max={"20"}
                    onChange={addProductQuanity}
                  />
                </div>

                <div className="flex space-x-4 mb-6">
                  <Button
                    className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-semibold"
                    text="Add to Cart"
                    onClick={AddToCartFirebase}
                  />
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
