import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeHero() {
  const [mobMenu, setMobMenu] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="flex justify-between relative pb-28  md:h-screen ">
      <div>
        <div className="flex-col">
          <img
            className="w-40 pl-3 scale-50 md:scale-75 lg:scale-100 h-16 md:mt-6"
            src="inovasilogo.svg"
            alt=""
          />
          <h1 className="px-5 md:px-0 md:ml-0 md:max-w-sm text-popupTxt py-7 md:py-12 md:mt-72 md:w-64 md:h-60 font-bold md:text-4xl md:leading-14">
            Ensure Compliance Regulation Effortlessly with Agriplot's Due
            Diligence System
          </h1>
          <p className="px-5 md:px-0 md:mt-8 text-homeSubText text-justify py-7 md:py-12 md:ml-0 max-w-lg md:w-64 md:h-12 md:text-lg md:leading-6 font-medium">
            Introducing the Agriplot Due-Diligence system: Your partner for
            compliance with EU Deforestation Regulation.
          </p>
          <div className="flex flex-col md:flex-row gap-3 px-5 md:px-0 md:gap-4 justify-center md:justify-start md:mt-12">
            <button
              onClick={() => navigate("/login")}
              className="text-white hover:animate-pulse px-4 py-3 md:px-0 md:py-0 flex justify-center items-center bg-gradient-to-r from-footerHeading to-parrot md:w-32 md:h-11 leading-4 text-sm rounded-lg"
            >
              Book a Demo
            </button>
            <button className="text-homeBtnText px-4 py-3 md:px-0 md:py-0 md:w-32 md:h-11 leading-4 text-sm rounded-lg border-2 border-greenLantern">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <div>empty</div>
          <div>
            <div className=" md:block absolute top-6 left-64 md:w-5/6 xl:w-64 h-64 rounded-lg bg-gradient-to-r from-footerHeading to-parrot z-0 ">
              <div className="flex mt-2 md:mt-0 items-center justify-between ">
                <div className="md:mt-14 md:scale-75 items-center bg-gradient-to-r text-lg from-footerHeading to-parrot gap-3 hidden md:flex lg:gap-18 z-10 bg-opacity-20 px-4 rounded-lg py-4">
                  <button
                    onClick={() => navigate("/")}
                    className="font-bold text-creamGray"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="font-normal text-creamGray"
                  >
                    Features
                  </button>
                  <button className="font-normal text-creamGray">News</button>
                  <button
                    onClick={() => navigate("/aboutus")}
                    className="font-normal text-creamGray"
                  >
                    About
                  </button>
                  <button
                    onClick={() => navigate("/getintouch")}
                    className="text-footerHeading bg-white py-4 px-6 rounded-lg text-sm font-semibold"
                  >
                    Get in touch
                  </button>
                </div>
                <div
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            className="absolute hidden md:hidden left-64 top-16 z-99 w-96 h-96"
            src="heroIpad.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
export default HomeHero;
