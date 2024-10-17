import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_PATH, SIGNUP_PATH } from "../Utils/constants";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Components/firebase";
import { useDispatch } from "react-redux";
import { saveUser } from "../features/login";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../Components/firebase";
import Toast from "../Assets/svg/toast";
import Loader from "../Assets/svg/loader";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [showLoader, setShowLoader] = useState(false);

  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      setShowLoader(true);
      const firebaseLogin = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      console.log("firebaseLogin", firebaseLogin);

      const docRef = doc(db, "Users", firebaseLogin?.user?.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        dispatch(saveUser(docSnap?.data()));
      } else {
        console.log("No such document!");
      }

      navigate(HOME_PATH);
      setShowLoader(false);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(true);
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full flex justify-around"
            onClick={onLogin}
            disabled={userEmail.length < 3 && password.length < 6}
          >
            Login
            {showLoader ? (
                  <div role="status">
                    <Loader />
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : null}
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
    </>
  );
};

export default LoginPage;
