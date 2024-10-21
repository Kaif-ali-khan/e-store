import React from "react";
import Label from "./Label";

const Input = ({ type, name, id, placeholder, onChange, value, labelText }) => {
  return (
    <>
      {labelText ? <Label text={labelText} /> : null}       

      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required=""
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default Input;
