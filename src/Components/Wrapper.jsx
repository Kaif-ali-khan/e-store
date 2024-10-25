import React from "react";
import NavBar from "./NavBar";

const Wrapper = ({ children }) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default Wrapper;
