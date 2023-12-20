import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import Footer from "../components/homepagecomp/Footer";

function GetInTouch() {
  const [mobMenu, setMobMenu] = useState(false);
  const [phone, setPhone] = useState("");

  return (
    <div>
      {/* navbar */}
      <div className="h-[104px] px-[20px] md:px-[70px] lg:px-[112.5px] flex justify-between items-center bg-gradient-to-r from-[#04774F] to-[#46833C] 04774F">
        <img
          className="w-[170px] h-[64px] scale-50 md:scale-75 lg:scale-100"
          src="inovasilogo.png"
          alt=""
        />
        {/* normal menu */}
        <div className="hidden text-[18px] leading-[21.94px] font-[400] md:flex gap-[72px] items-center text-creamGray text-opacity-60">
          <button>Home</button>
          <button>Dashboard</button>
          <button>News</button>
          <button>About</button>
        </div>
        {/* mobile menu */}
        <div
          onClick={() => setMobMenu(!mobMenu)}
          className="mr-14  flex md:hidden flex-col gap-2 border-4 rounded-lg cursor-pointer border-parrot px-4 py-2 font-bold"
        >
          MENU
          <div
            className={`${
              mobMenu ? "flex flex-col gap-4 " : "hidden"
            } absolute inset-0 top-20  left-0 w-screen h-full py-10 px-2  bg-gray-600 bg-opacity-80 text-white font-semibold `}
          >
            <button className="bg-gradient-to-r from-footerHeading to-parrot  px-4 py-2 rounded-lg">
              HOME
            </button>
            <button className="bg-gradient-to-r from-footerHeading to-parrot  px-4 py-2 rounded-lg">
              DASHBOARD
            </button>
            <button className="bg-gradient-to-r from-footerHeading to-parrot px-4 py-2 rounded-lg ">
              NEWS
            </button>
            <button className="bg-gradient-to-r from-footerHeading to-parrot  px-4 py-2 rounded-lg">
              ABOUT
            </button>
          </div>
        </div>
      </div>
      {/* contact us section */}
      <div className="h-[250px] md:h-[350px] lg:h-[538px] bg-gradient-to-r from-footerHeading to-parrot flex items-center justify-center">
        <h2 className="text-[28px] md:text-[32px] lg:text-[50px] font-bold leading-[60.95px] text-creamGray">
          Contact Us
        </h2>
      </div>
      {/* get in touch section */}
      <div className="h-[1188px] py-[80px] px-[20px] md:px-[100px] lg:px-[194px] flex flex-col gap-[10px] md:gap-[20px] lg:gap-[40px]  items-center">
        <div className="text-center px-[10px] md:px-[32px] max-w-[768px] flex flex-col gap-[21px]">
          <h6 className="font-bold leading-[21.94px] text-[18px] bg-gradient-to-r from-footerHeading to-parrot inline-block text-transparent bg-clip-text">
            Get in touch
          </h6>
          <h3 className="font-bold leading-[48.76px] text-[20px] md:text-[32px] lg:text-[40px] text-blackest">
            Have a question or want to see how it works?
          </h3>
        </div>
        <div className="max-w-[1013px] min-h-[856px] rounded-[20px] font-bold text-[16px] leading-[19.5px] text-blackest p-[10px] md:p-[30px] lg:p-[50px] flex flex-col gap-[10px] md:gap-[20px] lg:gap-[30px] bg-registerBg">
          <h5 className="leading-[32px] text-[16px] md:text-[24px] ">
            How can we help?
          </h5>
          <div className="flex flex-col lg:flex-row gap-[10px] md:gap-[15px] lg:gap-[25px] lg:items-center">
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="">
                First Name{" "}
                <span className="font-[400] text-[16px]"> (required)</span>
              </label>
              <input
                placeholder="First Name"
                className="placeholder:text-inputGrey lg:w-[444px] placeholder:font-[400] font-[400] py-[12px] px-[6px] md:px-[16px] bg-white border border-registerInputBorder rounded-lg ring-0 focus:ring-0 focus:outline-none active:ring-0"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-[6px] ">
              <label htmlFor="">
                Last Name{" "}
                <span className="font-[400] text-[16px]"> (optional)</span>
              </label>
              <input
                placeholder="Last Name"
                className="placeholder:text-inputGrey lg:w-[444px] placeholder:font-[400] font-[400] py-[12px] px-[16px] bg-white border border-registerInputBorder rounded-lg ring-0 focus:ring-0 focus:outline-none active:ring-0"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[6px] ">
            <label htmlFor="">
              Email <span className="font-[400] text-[16px]"> (required)</span>
            </label>
            <input
              placeholder="you@company.com"
              className="placeholder:text-inputGrey lg:w-[913px] placeholder:font-[400] font-[400] py-[12px] px-[16px] bg-white border border-registerInputBorder rounded-lg ring-0 focus:ring-0 focus:outline-none active:ring-0"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-[6px] ">
            <label htmlFor="">
              Organization{" "}
              <span className="font-[400] text-[16px]"> (required)</span>
            </label>
            <input
              placeholder="Organization"
              className="placeholder:text-inputGrey lg:w-[913px] placeholder:font-[400] font-[400] py-[12px] px-[16px] bg-white border border-registerInputBorder rounded-lg ring-0 focus:ring-0 focus:outline-none active:ring-0"
              type="text"
            />
          </div>{" "}
          <div className="flex flex-col gap-[6px] ">
            <label htmlFor="">
              Phone Number{" "}
              <span className="font-[400] text-[16px]"> (optional)</span>
            </label>
            <PhoneInput
              className="placeholder:text-inputGrey lg:w-[913px] placeholder:font-[400] font-[400] py-[12px] px-[16px] bg-white border border-registerInputBorder rounded-lg ring-0 focus:ring-0 focus:outline-none active:ring-0"
              placeholder="123456789"
              flags={flags}
              country={"us"}
              value={phone}
              onChange={(phone: string) => setPhone(phone)}
            />
          </div>
          <div className="flex flex-col gap-[6px] ">
            <label htmlFor="">Message </label>
            <textarea
              className="placeholder:text-inputGrey lg:w-[913px] h-[128px] placeholder:font-[400] font-[400] py-[10px] px-[14px] bg-white border border-registerInputBorder rounded-lg ring-0 focus:ring-0 focus:outline-none active:ring-0 content-start items-start flex"
              type="text"
            />
          </div>{" "}
          <button className="bg-gradient-to-r hover:animate-pulse  duration-[100ms] from-footerHeading to-parrot py-[14px] px-[132px] max-w-[301px] mx-auto rounded-lg text-creamGray leading-[17.07px] text-[14px] font-semibold">
            Send
          </button>
          <div className="h-[1px] bg-[#D0D0D080] bg-opacity-50"></div>
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default GetInTouch;
