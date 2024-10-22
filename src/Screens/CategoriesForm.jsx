import React, { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Label from "../Components/Label";
import NavBar from "../Components/NavBar";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Config/firebase";

const CategoriesForm = () => {
  // const { id } = useParams();
  const userId = useSelector((state) => state?.login?.user?.id);
  // console.log("state", userId);
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const categoryInput = (e) => {
    let input = e.target.value;
    setCategory(input);
    console.log("categoryInput", input);
  };

  const isActiveSelect = (e) => {
    let input = e.target.value;
    setIsActive(input);
    console.log("isActiveSelect", input);
  };

  const saveCategory = async () => {
    const date = new Date().getTime();
    try {
      setShowLoader(true);
      let saveDoc = await addDoc(collection(db, "Categories"), {
        name: category,
        isActive: isActive,
        isDeleted: false,
        createdAt: date,
        updatedAt: date,
        updatedBy: userId,
      });
      console.log("Document written with ID: ", saveDoc);
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      setShowLoader(false);
      setErrorMessage(true);
    }
  };

  // const updateCategory = async () => {
  //   try {
  //     setShowLoader(true);

  //     let categoryDocUpdate = await updateDoc(doc(db, "Categories", id), {
  //       Category: category,
  //       Active: isActive,
  //     });

  //     console.log("categoryDocUpdate", categoryDocUpdate);
  //     setShowLoader(false);
  //   } catch (error) {
  //     console.log(error);
  //     setShowLoader(false);
  //     setErrorMessage(true);
  //   }
  // };

  return (
    <>
      <NavBar />

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-4 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add Categories
              </h1>
              {/* <form className="space-y-4 md:space-y-6 " onSubmit={saveCategory}> */}
              <div>
                <Input
                  type={"text"}
                  placeholder={"Add category Here"}
                  onChange={categoryInput}
                  labelText="Category"
                />
              </div>

              <div>
                <Label text="Active" />
                <select className="w-full h-9 border" onChange={isActiveSelect}>
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <Button
                onClick={saveCategory}
                text="Save"
                showLoader={showLoader}
              />
              {/* </form> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesForm;
