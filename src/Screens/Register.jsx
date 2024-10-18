import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../Utils/constants";
import Toast from "../Assets/svg/toast";
import Loader from "../Assets/svg/loader";
import { useRegisterMutation } from "../features/api/auth";
import Input from "../Components/Input";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [register] = useRegisterMutation();

  const onRegister = async () => {
    try {
      const result = await register({
        userEmail,
        userPassword,
        userPhone,
        userName,
      });
      console.log("result", result);
      if (result) {
        navigate(LOGIN_PATH);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(true);
    }
  };

  const onChangeName = (e) => setUserName(e.target.value);
  const onChangePhone = (e) => setUserPhone(e.target.value);
  const onChangeEmail = (e) => setUserEmail(e.target.value);
  const onChangePassword = (e) => setUserPassword(e.target.value);

  return (
    <>
      {errorMessage ? <Toast /> : null}

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-4 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6 " action="#">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <Input
                    type={"text"}
                    placeholder={"Type Name Here"}
                    onChange={onChangeName}
                  />
                </div>
                <div>
                  <label
                    htmlFor="number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <Input
                    type={"number"}
                    placeholder={"Phone Number"}
                    onChange={onChangePhone}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <Input
                    type={"email"}
                    placeholder={"name@company.com"}
                    onChange={onChangeEmail}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <Input
                    type={"password"}
                    placeholder={"••••••••"}
                    onChange={onChangePassword}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-around"
                  onClick={onRegister}
                >
                  Create an account
                  {showLoader ? (
                    <div role="status">
                      <Loader />
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : null}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
