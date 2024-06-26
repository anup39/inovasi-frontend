import { Checkbox } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [phone, setPhone] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <div className="flex max-w-[1920px]  items-center bg-white overflow-hidden ">
      <div className="w-full lg:w-[1217px] bg-white ">
        <div className=" pt-[15px] pl-[20px] md:pl-[55px] lg:pl-[108px]">
          <img
            className="w-[170px] h-[64px] scale-50 md:scale-75 lg:scale-100"
            src="inovasilogo.png"
            alt="Inovasi Logo"
          />
        </div>

        <div className="max-w-[826px]  mt-[25px] mx-[20px] md:mx-[90px] lg:mx-[195px] flex  flex-col">
          <div className="flex flex-col gap-[15px] md:gap-[32px] mt-[38px]">
            <h2 className="text-footerHeading text-center text-[18px] leading-[21.94px] font-bold">
              Welcome!
            </h2>
            <h1 className="text-[25px] md:text-[40px] text-center text-blackest leading-[48.76px] font-bold">
              Create an account
            </h1>
          </div>
          <div className="bg-registerBg p-[10px] md:p-[20px] rounded-[20px] mt-[25px] md:mt-[46px] mb-[50px] w-full m-auto">
            <form className="flex flex-col gap-[15px] md:gap-[30px]">
              <div className="cursor-pointer mx-auto scale-50 md:scale-75 lg:scale-100">
                <img src="registerprofile.png" alt="" />
              </div>
              <div className="flex flex-col gap-[35px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="font-semibold text-[16px] leading-[19.5px]">
                    Name
                  </label>
                  <input
                    placeholder="Full name"
                    className="py-[12px] px-[16px] rounded-lg border border-registerInputBorder"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="font-semibold text-[16px] leading-[19.5px]">
                    Company
                  </label>
                  <input
                    placeholder="Company Name"
                    className="py-[12px] px-[16px] rounded-lg border border-registerInputBorder"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="font-semibold text-[16px] leading-[19.5px]">
                    {" "}
                    Email{" "}
                  </label>
                  <input
                    placeholder="you@company.com"
                    className="py-[12px] px-[16px] rounded-lg border border-registerInputBorder"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="font-semibold text-[16px] leading-[19.5px]">
                    {" "}
                    Phone Number{" "}
                  </label>
                  <PhoneInput
                    className="py-[12px] px-[16px] rounded-lg border border-registerInputBorder"
                    placeholder="123456789"
                    flags={flags}
                    country={"us"}
                    value={phone}
                    onChange={(phone: string) => setPhone(phone)}
                  />
                </div>
                <div className="relative flex flex-col gap-[6px]">
                  <label className="font-semibold text-[16px] leading-[19.5px]">
                    {" "}
                    Password{" "}
                  </label>
                  <input
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
                <div className="relative flex flex-col gap-[6px]">
                  <label className="font-semibold text-[16px] leading-[19.5px]">
                    Confirm Password
                  </label>
                  <input
                    placeholder="Confirm Password"
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
                    I agree to the{" "}
                    <span
                      className="font-semibold"
                      style={{
                        background:
                          "linear-gradient(90deg, #02C685 0%, #8ADF5E 97.40%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Terms & condition
                    </span>{" "}
                    and{" "}
                    <span
                      className="font-semibold"
                      style={{
                        background:
                          "linear-gradient(90deg, #02C685 0%, #8ADF5E 97.40%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Privacy Policy
                    </span>
                  </p>
                </div>
                <button className=" h-[45px] text-white w-full  rounded-md bg-gradient-to-r from-footerHeading to-parrot">
                  Confirm
                </button>
                <button className="border w-full h-[85px] rounded-[10px]">
                  <div className="flex justify-center items-center">
                    <img
                      className="inline px-3 scale-75 lg:scale-100"
                      src="registergoogleicon.png"
                      alt=""
                    />
                    <h1 className="font-semibold text-[10px] md:text-[16px] leading-[19.5px]">
                      {" "}
                      Continue with Google{" "}
                    </h1>
                  </div>
                </button>
                <h1 className="font-[500] text-[16px] leading-[19.5px]">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-footerHeading font-semibold"
                  >
                    Log in
                  </Link>
                </h1>
                <hr className="border-t-2 border-gray-200 font-semibold"></hr>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[703px] h-[1672px]  right-0 top-0 bg-gradient-to-r from-footerHeading to-parrot"></div>
    </div>
  );
}
export default Register;
