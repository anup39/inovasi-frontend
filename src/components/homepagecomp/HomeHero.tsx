import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeHero() {
  const [mobMenu, setMobMenu] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="ml-[97px] relative overflow-x-hidden">
      {/*menu and img */}
      <div className="flex items-center justify-between ">
        <img
          className="w-[170px] pl-[11px] scale-50 md:scale-75 lg:scale-100 h-[64px] mt-[25px]"
          src="inovasilogo.svg"
          alt=""
        />
        {/* menu */}
        <div className="mt-[57px] items-center bg-gradient-to-r text-[18px] from-footerHeading to-parrot gap-3 hidden md:flex lg:gap-[72px] z-10  bg-opacity-20 px-4 rounded-lg py-4">
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
      <div className="py-5 lg:py-56 text-center md:text-left px-16 w-screen z-10 space-y-6 overflow-x-hidden">
        {/* this bg */}
        <div className="hidden lg:block absolute top-4 right-0 w-[40%]  h-[900px] rounded-l-xl bg-gradient-to-r from-footerHeading to-parrot z-0 "></div>

        <img
          className="absolute hidden lg:block scale-75 w-2/3 ml-[100%] top-12 -right-[160px] z-99"
          src="heroIpad.png"
          alt=""
        />
        <h1 className="max-w-xs text-xl md:text-[2xl] font-bold mx-auto md:mx-0">
          Ensure Compliance Regulation Effortlessly with Agriplot's Due
          Diligence System
        </h1>
        <p className="max-w-md text-homeSubText mx-auto md:mx-0">
          Introducing the Agriplot Due-Diligence system: Your Partner for
          Compliance with EU Deforestation Regulation.
        </p>
        <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start py-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-white hover:animate-pulse bg-gradient-to-r from-footerHeading to-parrot px-5 py-2 rounded-lg"
          >
            Book a Demo
          </button>
          <button className="text-homeBtnText px-5 py-2 rounded-lg border-2 border-greenLantern">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
export default HomeHero;
