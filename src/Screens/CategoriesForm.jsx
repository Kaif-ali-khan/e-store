import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Label from "../Components/Label";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import dayjs from "dayjs";

const CategoriesForm = () => {
  const { id } = useParams();
  const userId = useSelector((state) => state?.login?.user?.id);
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const categoryInput = (e) => {
    let input = e.target.value;
    setCategory(input);
  };

  const isActiveSelect = (e) => {
    let isActiveValue = e.target.value === "true";
    setIsActive(isActiveValue);
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

      if (id) {
        await updateDoc(doc(db, "Categories", id), data);
        setShowLoader(false);
      } else {
        await addDoc(collection(db, "Categories"), data);
        setShowLoader(false);
      }
    } catch (error) {
      setShowLoader(false);
      setErrorMessage(true);
    }
  };

  const getCategory = async () => {
    try {
      const categoryDocRef = doc(db, "Categories", id);
      const categoryDocSnap = await getDoc(categoryDocRef);
      if (categoryDocSnap.exists()) {
        const categoryData = categoryDocSnap.data();
        setCategory(categoryData?.name);
        setIsActive(categoryData?.isActive);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    if (id) {
      getCategory();
    }
  }, [id]);

  return (
    <div className="w-5/6 m-auto">
      <div className="mt-12">
        <h1 className="text-3xl font-bold">{id ? "Edit" : "Add"} Category</h1>
        <div className="mt-8">
          <Label text="Category Name" />
          <Input
            type="text"
            value={category}
            onChange={categoryInput}
            placeholder="Enter Category Name"
          />
        </div>

        <div className="mt-8">
          <Label text="Is Active" />
          <select onChange={isActiveSelect} value={isActive}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            onClick={saveCategory}
            className="py-2 px-4 bg-blue-600 text-white rounded"
            text={showLoader ? "Saving..." : "Save Category"}
          />
        </div>

        {errorMessage && (
          <div className="mt-4 text-red-600">
            <p>Something went wrong. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesForm;
