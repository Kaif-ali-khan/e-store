import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Label from "../Components/Label";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import dayjs from "dayjs";

const CategoriesForm = () => {
  const { id } = useParams();
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
    let isActiveValue = e.target.value === "true";
    setIsActive(isActiveValue);
    console.log("isActiveSelect", isActiveValue);
    console.log("isActiveSelect", typeof isActiveValue);
  };

  const saveCategory = async () => {
    const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
    try {
      setShowLoader(true);
      const data = {
        name: category,
        isActive: isActive,
        isDeleted: false,
        createdAt: date,
        updatedAt: date,
        updatedBy: userId,
      };
      console.log("data", data);
      let saveDoc = await addDoc(collection(db, "Categories"), data);
      console.log("Document written with ID: ", saveDoc);
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      setShowLoader(false);
      setErrorMessage(true);
    }
  };

  const updateCategory = async () => {
    const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
    try {
      setShowLoader(true);
      const data = {
        name: category,
        isActive: isActive,
        updatedAt: date,
        updatedBy: userId,
      };

      console.log("data", data);
      let categoryDocUpdate = await updateDoc(doc(db, "Categories", id), data);

      console.log("categoryDocUpdate", categoryDocUpdate);
      setShowLoader(false);
    } catch (error) {
      console.log(error);
      setShowLoader(false);
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    getCategoryFromDb();
  }, []);

  const getCategoryFromDb = async () => {
    try {
      if (id) {
        const docRef = doc(db, "Categories", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("docSnap", docSnap.data());
          setCategory(docSnap?.data()?.name);
          setIsActive(docSnap?.data()?.isActive);
          console.log("Document data:");
          console.log("docSnap?.data", docSnap?.data());
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

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-4 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {id ? "Edit Category" : "Add Category"}
              </h1>
              {/* <form className="space-y-4 md:space-y-6 " onSubmit={saveCategory}> */}
              <div>
                <Input
                  type={"text"}
                  placeholder={"Add category Here"}
                  onChange={categoryInput}
                  value={category}
                  labelText="Category"
                />
              </div>

              <div>
                <Label text="Active" />
                <select
                  className="w-full h-9 border"
                  onChange={isActiveSelect}
                  value={isActive}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <Button
                onClick={id ? updateCategory : saveCategory}
                text={id ? "Edit" : "Save"}
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
