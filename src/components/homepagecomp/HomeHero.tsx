// import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeHero() {
  // @ts-ignore
  // const [mobMenu, setMobMenu] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="flex pb-28 h-screen">
      <div className="w-1/2 ml-5">
        <div className="flex flex-col  gap-y-64   ml-5">
          <img
            className="w-40 h-16  scale-50 md:scale-75 lg:scale-100  md:mt-6"
            src="inovasilogo.svg"
            alt=""
          />
          <div className="flex flex-col gap-y-5 ">
            <h1 className="w-1/2  text-popupTxt font-bold text-3xl leading-normal">
              Ensure Compliance Regulation Effortlessly with Agriplot's Due
              Diligence System
            </h1>
            <p className="w-1/2  text-homeSubText font-medium">
              Introducing the Agriplot Due-Diligence system: Your partner for
              compliance with EU Deforestation Regulation.
            </p>
            <div className="flex flex-col md:flex-row  md:gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2   text-white hover:animate-pulse bg-gradient-to-r from-footerHeading to-parrot   text-sm rounded-lg"
              >
                Book a Demo
              </button>
              <button className="px-6 py-2 text-homeBtnText text-sm rounded-lg border-2 border-greenLantern">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="h-full mt-5 flex flex-row justify-start ">
          <div className="w-1/12"></div>
          <div className="w-full mr-3">
            <div className="h-full rounded-[30px] bg-gradient-to-r from-footerHeading to-parrot">
              <div className="flex items-center justify-between ">
                <div className="w-full flex flex-row items-center  justify-between ml-5 mr-5 py-4  bg-gradient-to-r  from-footerHeading to-parrot   bg-opacity-20  rounded-lg ">
                  <button
                    onClick={() => navigate("/")}
                    className="ml-3 font-bold text-creamGray"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="ml-3 font-normal text-creamGray"
                  >
                    Features
                  </button>
                  <button className="font-normal text-creamGray">News</button>
                  <button
                    onClick={() => navigate("/aboutus")}
                    className="ml-3 font-normal text-creamGray"
                  >
                    About
                  </button>
                  <button
                    onClick={() => navigate("/getintouch")}
                    className="text-footerHeading bg-white py-4 px-6 mr-10 ml-3 rounded-lg text-sm font-semibold"
                  >
                    Get in touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ top: "10%" }} className="absolute right-3">
          <img className="" src="heroIpad.png" alt="" />
        </div>
      </div>
    </div>
  );
}
export default HomeHero;

// Menu for the mobile
{
  /* <div
  onClick={() => setMobMenu(!mobMenu)}
  className="md:hidden mr-14  flex  flex-col gap-2 border-4 rounded-lg cursor-pointer border-parrot px-4 py-2 font-bold"
>
  MENU
  <div
    className={`${
      mobMenu ? "flex flex-col gap-4 " : "hidden"
    } absolute inset-0 top-20 left-0 w-screen h-full py-10 px-2 bg-gray-600 bg-opacity-80 text-white font-semibold `}
  >
    <button
      onClick={() => navigate("/")}
      className="bg-gradient-to-r from-footerHeading to-parrot px-4 py-2 rounded-lg"
    >
      HOME
    </button>
    <button
      onClick={() => navigate("/dashboard")}
      className="bg-gradient-to-r from-footerHeading to-parrot px-4 py-2 rounded-lg"
    >
      FEATURES
    </button>
    <button className="bg-gradient-to-r from-footerHeading to-parrot px-4 py-2 rounded-lg ">
      NEWS
    </button>
    <button
      onClick={() => navigate("/aboutus")}
      className="bg-gradient-to-r from-footerHeading to-parrot px-4 py-2 rounded-lg"
    >
      ABOUT
    </button>
  </div>
</div>; */
}
