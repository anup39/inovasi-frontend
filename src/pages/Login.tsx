import axios from "axios";
import "../css/login/Login.css";
import { useDispatch } from "react-redux";
import { setToken, setUserId, setUserName } from "../reducers/Auth";
import {
  setshowToast,
  settoastMessage,
  settoastType,
} from "../reducers/DisplaySettings";
import { ChangeEvent, useState } from "react";
import Toast from "../components/commoncomp/Toast";
import {} from "react";

function Login() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const handleLogin = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user && user !== "" && password && password !== "") {
      const data = {
        username: user,
        password: password,
      };
      axios
        .post(`${import.meta.env.VITE_API_DASHBOARD_URL}/api-token-auth/`, data)
        .then((res) => {
          const token = res.data.token;
          const user_id = res.data.user_id;
          const username = res.data.username;
          dispatch(setToken(token));
          dispatch(setUserId(user_id));
          dispatch(setUserName(username));

          localStorage.setItem("token", token);
          localStorage.setItem("user_id", user_id);
          localStorage.setItem("username", username);

          dispatch(setshowToast(true));
          dispatch(settoastMessage("Logged in Sucessfully. Loading .. "));
          dispatch(settoastType("success"));
          setTimeout(() => {
            window.location.replace("/dashboard");
          }, 3000);
        })
        .catch(() => {
          dispatch(setshowToast(true));
          dispatch(settoastMessage("Invalid Credentials"));
          dispatch(settoastType("error"));
        });
    }
  };
  return (
    <>
      <Toast />
      <div className="flex flex-col lg:flex-row relative h-screen">
        <img
          className="object-cover lg:w-1/2 googleIcon.svg"
          src="loginImage.png"
          alt=""
        />
        <div className="absolute top-10 left-10 bg-white p-1 rounded-md">
          <img src="inovasilogo.svg" alt="" />
        </div>
        <div className="absolute top-[50%] h-1/2 lg:h-full lg:static flex flex-col justify-center  bg-white px-12 w-full lg:w-1/2 py-10">
          <h1 className="text-2xl px-3 font-semibold ">Login</h1>
          <form
            onSubmit={handleLogin}
            className="py-5 px-3 pr-8 flex flex-col gap-4"
            action=""
          >
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setUser(event.target.value)
              }
              required
              type="text"
              name=""
              id=""
              placeholder="username"
            />
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
              required
              type="password"
              name=""
              placeholder="Password"
              id=""
            />

            <button className="text-center my-5 px-12 py-2 text-white bg-black border w-2/3 border-blue-700 rounded-sm">
              Login
            </button>
            <h1>
              or Quick Sign-up with :
              <span>
                <img className="inline px-3" src="googleIcon.svg" alt="" />
              </span>
            </h1>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
