import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../Utils/constants";
import Toast from "../Assets/svg/toast";
import { useRegisterMutation } from "../features/api/auth";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Anchor from "../Components/Anchor";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [uploadImage, setUploadImage] = useState();

  const [register] = useRegisterMutation();

  const onRegister = async () => {
    try {
      setShowLoader(true);
      const result = await register({
        userEmail,
        userPassword,
        userPhone,
        userName,
        uploadImage,
      });
      console.log("result", result);
      if (result) {
        navigate(LOGIN_PATH);
      }
      setShowLoader(false);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(true);
      setShowLoader(false);
    }
  };

  const onChangeName = (e) => setUserName(e.target.value);
  const onChangePhone = (e) => setUserPhone(e.target.value);
  const onChangeEmail = (e) => setUserEmail(e.target.value);
  const onChangePassword = (e) => setUserPassword(e.target.value);
  const onUploadImage = (e) => {
    setUploadImage(e.target.files[0]);
    console.log("Click");
  };

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
                  <Input
                    type={"text"}
                    placeholder={"Type Name Here"}
                    onChange={onChangeName}
                    labelText="Name"
                  />
                </div>

                <div>
                  <Input
                    type={"number"}
                    placeholder={"Phone Number"}
                    onChange={onChangePhone}
                    labelText="Phone"
                  />
                </div>

                <div>
                  <Input
                    type={"email"}
                    placeholder={"name@company.com"}
                    onChange={onChangeEmail}
                    labelText="Email"
                  />
                </div>

                <div>
                  <Input
                    type={"password"}
                    placeholder={"••••••••"}
                    onChange={onChangePassword}
                    labelText="Password"
                  />
                </div>
                <div>
                  <Input
                    type={"file"}
                    onChange={onUploadImage}
                    labelText="Upload Image"
                  />
                </div>
                <Button
                  onClick={onRegister}
                  text="Register"
                  showLoader={showLoader}
                />

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Anchor
                    to={LOGIN_PATH}
                    text={"Login here"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  />
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
