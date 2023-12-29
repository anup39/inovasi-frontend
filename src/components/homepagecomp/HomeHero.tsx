import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeHero() {
  const [mobMenu, setMobMenu] = useState(false);

  const navigate = useNavigate();
  return (
    <div className=" md:ml-[50px] pb-28 lg:py-0 middle:ml-[97px] relative overflow-x-hidden middle:h-[1186px]">
      {/* this bg */}
      <div className="hidden middle:block absolute top-[25px] left-[1055px] middle:w-5/6 xl:w-[922px]  h-[1028px] rounded-[25px] bg-gradient-to-r from-footerHeading to-parrot z-0 "></div>

      <img
        className="absolute hidden middle:block left-[839px] top-[169px] z-99"
        src="heroIpad.png"
        alt=""
      />
      {/*menu and img */}
      <div className="flex mt-[10px] middle:mt-0 items-center justify-between ">
        <img
          className="w-[170px] pl-[11px] scale-50 md:scale-75 lg:scale-100 h-[64px] middle:mt-[25px]"
          src="inovasilogo.svg"
          alt=""
        />
        {/* menu */}
        <div className="middle:mt-[57px] md:scale-75 middle:scale-100 items-center bg-gradient-to-r text-[18px] from-footerHeading to-parrot gap-3 hidden md:flex lg:gap-[72px] z-10  bg-opacity-20 px-4 rounded-lg py-4">
          <button className="font-bold text-creamGray">Home</button>
          <button className="font-normal text-creamGray">Features</button>
          <button className="font-normal text-creamGray">News</button>
          <button className="font-normal text-creamGray">About</button>
          <button className="text-footerHeading bg-white py-[15px] px-[25px] rounded-lg text-[16px] font-semibold">
            Get in touch
          </button>
        </div>
        <div
          onClick={() => setMobMenu(!mobMenu)}
          className="mr-14 flex md:hidden flex-col gap-2 border-4 rounded-lg cursor-pointer border-parrot px-4 py-2 font-bold"
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
              FEATURES
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
      <h1 className="px-[20px] middle:px-0 md:ml-[1px] md:max-w-sm middle:max-w-full text-popupTxt py-[30px] md:py-[50px] middle:py-0 middle:mt-[298px] middle:w-[693px] middle:h-[244px] font-bold middle:text-[50px] middle:leading-[60.95px]">
        Ensure Compliance Regulation Effortlessly with Agriplot's Due Diligence
        System
      </h1>
      <p className="px-[20px] middle:px-0 middle:mt-[35px] text-homeSubText text-justify py-[30px] md:py-[50px] middle:py-0 md:ml-[1px] max-w-lg middle:w-[585px] middle:h-[48px] middle:text-[20px] middle:leading-[24.38px] font-[400]">
        Introducing the Agriplot Due-Diligence system: Your partner for
        compliance with EU Deforestation Regulation.
      </p>
      <div className="flex flex-col md:flex-row gap-3 px-[20px] middle:px-0 middle:gap-[16px] justify-center md:justify-start middle:mt-[50px]">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-white hover:animate-pulse px-4 py-3 middle:px-0  middle:py-0 flex justify-center items-center bg-gradient-to-r from-footerHeading to-parrot  middle:w-[137px] middle:h-[45px] leading-[17.07px] text-[14px] rounded-lg"
        >
          Book a Demo
        </button>
        <button className="text-homeBtnText px-4 py-3 middle:px-0  middle:py-0 middle:w-[137px] middle:h-[45px] leading-[17.07px] text-[14px] rounded-lg border-2 border-greenLantern">
          Learn More
        </button>
      </div>
    </div>
  );
}
export default HomeHero;
