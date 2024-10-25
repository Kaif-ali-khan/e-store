import React from "react";

const CategoriesBtn = ({ text, onClick }) => {
  return (
    <button
      className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-around font-bold"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CategoriesBtn;
