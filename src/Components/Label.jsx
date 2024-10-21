import React from "react";

const Label = ({ text }) => {
  return (
    <label
      htmlFor="name"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {text}
    </label>
  );
};

export default Label;
