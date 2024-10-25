import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PATH, SIGNUP_PATH } from "../Utils/constants";
import Toast from "../Assets/svg/toast";
import { useLoginMutation } from "../features/api/auth";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Anchor from "../Components/Anchor";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [login] = useLoginMutation();
  const [showLoader, setShowLoader] = useState(false);

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
      setShowLoader(true);
      const result = await login({ userEmail, password });
      console.log("result", result);
      if (result?.data) {
        navigate(HOME_PATH);
      }
      setShowLoader(false);
    } catch (error) {
      console.log("Login failed:", error.message);
      // You can also display this error to the user
      setShowLoader(false);
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
            <Input
              type={"email"}
              onChange={onChangeEmail}
              value={userEmail}
              labelText="Email"
            />
          </div>

          <div className="mb-4">
            <Input
              type={"password"}
              onChange={onChangePassword}
              value={password}
              labelText="Password"
            />
          </div>

          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          <Button
            onClick={onLogin}
            text="Login"
            disabled={userEmail?.length < 3 && password?.length < 6}
            showLoader={showLoader}
          />

          {/* </form> */}

          <div className="mt-6 text-blue-500 text-center">
            <Anchor
              to={SIGNUP_PATH}
              text={"Sign up Here"}
              className={"hover:underline"}
            />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
