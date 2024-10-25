import React from "react";
import { Link } from "react-router-dom";
const Anchor = ({ to, onClick, text, className }) => {
  return (
    <Link
      to={to}
      className={ className || "block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 hover:border-b-2 hover:border-blue-500 hover:font-medium md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"}
      onClick={onClick}

    >
      {text}
    </Link>
  );
};

export default Anchor;
