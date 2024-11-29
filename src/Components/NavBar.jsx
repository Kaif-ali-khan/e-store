import { useState } from "react";
import {
  CARTPAGE_TABLE,
  CATEGORIES_TABLE,
  HOME_PATH,
  LOGIN_PATH,
  PRODUCT_TABLE,
} from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../features/Actions/login";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import Anchor from "../Components/Anchor";
import ToggleBtn from "./ToggleBtn";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const state = useSelector((state) => state?.login);
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(removeUser());

    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-500 dark:bg-gray-900 dark:border-gray-700 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Anchor
          to={HOME_PATH}
          text={"E-Store"}
          className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white"
        />
        <ToggleBtn onClick={toggleMenu} isMenuOpen={isMenuOpen} />

        {/* Full-Screen Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden z-50`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-black text-3xl"
          >
            &times;
          </button>
          <ul className="flex flex-col items-center justify-center h-full space-y-6 text-center text-black text-xl">
            {state?.user?.isAdmin ? (
              <>
                <Anchor
                  to={PRODUCT_TABLE}
                  onClick={toggleMenu}
                  text={"Products"}
                />
                <Anchor
                  to={CATEGORIES_TABLE}
                  onClick={toggleMenu}
                  text={"Categories"}
                />
              </>
            ) : null}

            <h3 className="block py-2 px-3 rounded">{state?.user?.name}</h3>
            <li>
              {state?.user ? (
                <Anchor
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  text={"Login"}
                />
              ) : (
                <Anchor to={LOGIN_PATH} text={"Login"} />
              )}
            </li>
          </ul>
        </div>

        {/* Desktop Menu */}
        <div
          className={`hidden w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {state?.user?.isAdmin ? (
              <>
                <Anchor to={PRODUCT_TABLE} text="Products" />
                <Anchor to={CATEGORIES_TABLE} text="Categories" />
              </>
            ) : null}

            {state?.user ? (
              <Anchor to={CARTPAGE_TABLE} text={"Cart-Table"} />
            ) : null}

            <SearchBar />

            <div className="flex gap-4 items-center">
              <h3 className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-100 hover:border-b-2 hover:border-blue-500 hover:font-medium md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                {state?.user?.name}
              </h3>

              {state?.user ? (
                <img
                  src={
                    state.user.imageUrl ||
                    "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?t=st=1729864662~exp=1729868262~hmac=f7c07886d278b11b3abd0c1c57edb30f04074cf634dd7e4354e7261211de4e53&w=740"
                  }
                  className="w-12 rounded-full"
                />
              ) : null}
            </div>
            <li>
              {state?.user ? (
                <Anchor onClick={logout} text={"logout"} />
              ) : (
                <Anchor to={LOGIN_PATH} text={"Login"} />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
