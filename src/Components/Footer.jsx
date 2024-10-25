import React from "react";
import Anchor from "../Components/Anchor";
const Footer = () => {
  return (
    <footer className="flex flex-col bottom-0 justify-between">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 flex gap-4">
          © 2024{" "}
          <Anchor text={"E-Store"}/>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap gap-4 items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Anchor text={"About"} />
          </li>
          <li>
            <Anchor text={"Privacy Policy"} />
          </li>
          <li>
            <Anchor text={"Licensing"} />
          </li>
          <li>
            <Anchor text={"Contact"} />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
