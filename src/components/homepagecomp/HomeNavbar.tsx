import { useState } from "react";
import "../../css/homepage/HomeNavbar.css";
function HomeNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="py-5 px-9 flex justify-between items-center">
      <div>
        <img src="ivovasi-Logo.png" alt="mainlogo" className="w-20" />
      </div>
      {/* Menu */}
      <div>
        <div className="hidden lg:flex space-x-7">
          <button className="font-semibold text-lightGreen">Home</button>
          <button>Feature</button>
          <button>News</button>
          <button>About</button>
          <button>Testimonials</button>
          <button className="bg-lightGreen text-white px-5 py-2">Login</button>
        </div>
        <div className="relative pr-5 pb-5">
          {/* Mobile Hamburger */}
          {/* The class hamburger has some css applied for styling which can be found at css file */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`z-40 block absolute top-0 focus:outline-none lg:hidden hamburger ${
              isMenuOpen ? "open" : ""
            }`}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`inset-0 opacity-90  bg-gray-950 absolute text-center border-b  pt-12 h-screen z-30 text-white ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <div className="border-b-2 border-b-lightGreen py-2">
          <button className="uppercase font-semibold text-2xl py-3 px-6 hover:scale-105 rounded-sm bg-lightGreen text-white mb-4 ">
            <span>login</span>
          </button>
        </div>
        <div className="border-b-2 border-b-lightGreen py-2">
          <button className="uppercase font-semibold text-2xl py-3 px-6 hover:scale-105 text-lightGreen ">
            <span>home</span>
          </button>
        </div>
        <div className="border-b-2 border-b-lightGreen py-2">
          <button className="uppercase font-semibold text-2xl py-3 px-6 hover:scale-105 text-lightGreen">
            <span>feature</span>
          </button>
        </div>
        <div className="border-b-2 border-b-lightGreen py-2">
          <button className="uppercase font-semibold text-2xl py-3 px-6 hover:scale-105 text-lightGreen">
            <span>news</span>
          </button>
        </div>
        <div className="border-b-2 border-b-lightGreen py-2">
          <button className="uppercase font-semibold text-2xl py-3 px-6 hover:scale-105 text-lightGreen">
            <span>about</span>
          </button>
        </div>
        <div className=" py-2">
          <button className="uppercase font-semibold text-2xl py-3 px-6 hover:scale-105 text-lightGreen">
            <span>Testimonials</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default HomeNavbar;
