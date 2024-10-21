import React from "react";
import Loader from "../Assets/svg/loader";

const Button = ({ text, showLoader, onClick, disabled, className }) => {
  return (
    <button
      type="submit"
      className={className || "w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-around"}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {showLoader ? (
        <div role="status">
          <Loader />
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}
    </button>
  );
};

export default Button;
