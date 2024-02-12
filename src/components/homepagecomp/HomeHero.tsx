import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeHero() {
  const [mobMenu, setMobMenu] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="flex pb-28  md:h-screen ">
      <div className="w-1/3">
        <div className="flex-col ml-5">
          <img
            className="w-40 h-16  scale-50 md:scale-75 lg:scale-100  md:mt-6"
            src="inovasilogo.svg"
            alt=""
          />
          <h1 className="w-24  text-popupTxt font-bold text-2xl leading-normal">
            Ensure Compliance Regulation Effortlessly with Agriplot's Due
            Diligence System
          </h1>
          <p className="w-64  text-homeSubText font-medium">
            Introducing the Agriplot Due-Diligence system: Your partner for
            compliance with EU Deforestation Regulation.
          </p>
          <div className="flex flex-col md:flex-row ">
            <button
              onClick={() => navigate("/login")}
              className="text-white hover:animate-pulse bg-gradient-to-r from-footerHeading to-parrot   text-sm rounded-lg"
            >
              Book a Demo
            </button>
            <button className="text-homeBtnText text-sm rounded-lg border-2 border-greenLantern">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="w-2/3">
        <div className="flex justify-start">
          <div>empty</div>
          <div className="w-full">
            <div className="rounded-lg bg-gradient-to-r from-footerHeading to-parrot">
              <div className="flex items-center justify-between ">
                <div className="flex px-4  py-4 items-center bg-gradient-to-r  from-footerHeading to-parrot gap-3  bg-opacity-20  rounded-lg ">
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
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <img
            className="absolute left-64 top-16 z-99 w-96 h-96"
            src="heroIpad.png"
            alt=""
          />
        </div> */}
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
