import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_PATH, SIGNUP_PATH } from "../Utils/constants";

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();

  const navigate = useNavigate();

  const onLogin = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    console.log("userData", userData);
    let isEmailCorrect = userEmail === userData.email;
    console.log("isEmailCorrect", isEmailCorrect);
    let isPasswordCorrect = password === userData.password;

    if (isEmailCorrect && isPasswordCorrect) {
      setMessage({
        msg: "Login successful",
        color: "#00ff00",
      });

      navigate(HOME_PATH);
    } else {
      setMessage({
        msg: "Wrong Credentials",
        color: "#FF0000",
      });
    }
  };

  const onChangeEmail = (e) => {
    let inputText = e.target.value;
    console.log(inputText);
    setUserEmail(inputText);
  };

  const onChangePassword = (e) => {
    let inputText = e.target.value;
    console.log(inputText);
    setPassword(inputText);
  };

  return (
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
          <input
            type="email"
            id="username"
            name="username"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autoComplete="off"
            onChange={onChangeEmail}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autoComplete="off"
            onChange={onChangePassword}
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
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          onClick={onLogin}
          disabled={userEmail.length < 3 && password.length < 6}
        >
          Login
        </button>

        {/* </form> */}

        <div className="mt-6 text-blue-500 text-center">
          <Link to={SIGNUP_PATH} className="hover:underline">
            Sign up Here
          </Link>
          <br />

          {message ? (
            <p style={{ color: message.color }}>{message.msg}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
