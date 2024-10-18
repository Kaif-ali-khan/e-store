import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_PATH, SIGNUP_PATH } from "../Utils/constants";
import Toast from "../Assets/svg/toast";
import Loader from "../Assets/svg/loader";
import { useLoginMutation } from "../features/api/auth";
import Input from "../Components/Input";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  // const [message, setMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [login] = useLoginMutation();
  // const [showLoader, setShowLoader] = useState(false);

  const onLogin = async () => {
    if (!userEmail || !userEmail.includes("@")) {
      console.log("Invalid email format.");
      return;
    }
    if (!password) {
      console.log("Password cannot be empty.");
      return;
    }
    try {
      const result = await login({ userEmail, password });
      console.log("result", result);
      if (result?.data) {
        navigate(HOME_PATH);
      }
    } catch (error) {
      console.log("Login failed:", error.message);
      // You can also display this error to the user
    }
  };

  const onChangeEmail = (e) => {
    let inputText = e.target.value;
    setUserEmail(inputText);
  };

  const onChangePassword = (e) => {
    let inputText = e.target.value;
    setPassword(inputText);
  };

  return (
    <>
      {errorMessage ? <Toast /> : null}

      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src={require("../Assets/images/login-image.png")}
            alt="Placeholder Image"
            className=" w-3/5 h-3/5 object-center mt-32 ml-32 "
          />
        </div>

        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          {/* <form action="#" method="POST"> */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Email
            </label>
            <Input type={"email"} onChange={onChangeEmail} value={userEmail} />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <Input
              type={"password"}
              onChange={onChangePassword}
              value={password}
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div>

          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            // type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full flex justify-around"
            onClick={onLogin}
            disabled={userEmail?.length < 3 && password?.length < 6}
          >
            Login
            {/* {isLoading ? (
              <div role="status">
                <Loader />
                <span className="sr-only">Loading...</span>
              </div>
            ) : null} */}
          </button>

          {/* </form> */}

          <div className="mt-6 text-blue-500 text-center">
            <Link to={SIGNUP_PATH} className="hover:underline">
              Sign up Here
            </Link>
            <br />

            {/* {message ? (
              <p style={{ color: message.color }}>{message.msg}</p>
            ) : null} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
