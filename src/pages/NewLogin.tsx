import { Checkbox } from "@mui/material";
import { setToken, setUserId, setUserName } from "../reducers/Auth";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setshowToast,
  settoastMessage,
  settoastType,
} from "../reducers/DisplaySettings";
import { ChangeEvent } from "react";
import Toast from "../components/commoncomp/Toast";
import axios from "axios";

function NewLogin() {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
      <div className="flex max-w-[1920px] h-[1080px] bg-white">
        <div className="w-full lg:w-[1217px] bg-white ">
          <div className=" pt-[25px] pl-[20px] md:pl-[55px] lg:pl-[108px]">
            <img
              className="w-[170px] h-[64px] scale-50 md:scale-75 lg:scale-100"
              src="inovasilogo.png"
              alt="Inovasi Logo"
            />
          </div>

          <div className="mt-[25px] mx-[20px] md:mx-[90px] lg:mx-[195px] flex items-center flex-col">
            <div className="flex flex-col gap-[12px] md:gap-[32px] mt-[38px]">
              <h2 className="text-footerHeading text-center text-[18px] leading-[21.94px] font-bold">
                Welcome back!
              </h2>
              <h1 className="text-[25px] md:text-[40px] text-center text-blackest leading-[48.76px] font-bold">
                Log in to your account
              </h1>
            </div>
            <div className="bg-registerBg flex flex-col gap-[30px] md:gap-[40px] p-[10px] md:p-[20px] max-w-[826px] lg:p-[50px] h-[721px] rounded-[20px] mt-[25px] md:mt-[46px] w-full ">
              <button className="border w-full h-[85px] rounded-[10px]">
                <div className="flex justify-center items-center">
                  <img
                    className="inline px-3 scale-75 lg:scale-100"
                    src="registergoogleicon.png"
                    alt=""
                  />
                  <h1 className="font-semibold text-[10px] md:text-[16px] leading-[19.5px]">
                    {" "}
                    Log in with Google{" "}
                  </h1>
                </div>
              </button>
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-[15px] md:gap-[30px]"
              >
                <div className="flex flex-col gap-[30px]">
                  <div className="flex flex-col gap-[6px]">
                    <label className="font-semibold text-[16px] leading-[19.5px]">
                      {" "}
                      Email{" "}
                    </label>
                    <input
                      required
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setUser(event.target.value)
                      }
                      placeholder="you@company.com"
                      className="py-[12px] px-[16px] rounded-lg border border-registerInputBorder"
                    />
                  </div>

                  <div className="relative flex flex-col gap-[6px]">
                    <label className="font-semibold text-[16px] leading-[19.5px]">
                      {" "}
                      Password{" "}
                    </label>
                    <input
                      required
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Password (6 digits at least, case sensitive)"
                      className=" py-[12px] px-[16px] rounded-lg border border-registerInputBorder"
                    />
                    <img
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className={`${
                        passwordVisible ? "block" : "hidden"
                      } cursor-pointer absolute top-[57%] right-2`}
                      src="passwordshow.svg"
                      alt=""
                    />
                    <img
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className={`${
                        passwordVisible ? "hidden" : "block"
                      } cursor-pointer absolute top-[57%] right-2`}
                      src="passwordhide.svg"
                      alt=""
                    />
                  </div>

                  <div className="flex items-center">
                    <Checkbox />
                    <p className="font-[500] leading-[19.5px] text-[16px]">
                      Keep me logged in
                    </p>
                  </div>
                  <button className=" h-[45px] text-white w-full  rounded-md bg-gradient-to-r from-footerHeading to-parrot">
                    Confirm
                  </button>

                  <h1 className="font-[500] text-[16px] leading-[19.5px]">
                    Don’t have any account?{" "}
                    <Link
                      to="/register"
                      className="text-footerHeading font-semibold"
                    >
                      Sign up
                    </Link>
                  </h1>
                  <hr className="border-t-2 border-gray-200 font-semibold"></hr>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-[703px] h-[1080px]  right-0 top-0 bg-gradient-to-r from-footerHeading to-parrot"></div>
      </div>
    </>
  );
}
export default NewLogin;
