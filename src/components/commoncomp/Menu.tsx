import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../css/common/Menu.css";
function Menu() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleClick(path: string) {
    navigate(path);
  }

  function handleMobileClick(path: string) {
    navigate(path);
    setIsMenuOpen(false);
  }
  return (
    <div>
      <div className="">
        {/* Hamburger Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`z-40 absolute block focus:outline-none  lg:hidden hamburger ${
            isMenuOpen ? "open" : ""
          }`}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
      {/* mobile menu */}
      <div
        className={`inset-0 opacity-90  bg-gray-950 absolute text-center border-b  pt-12 h-screen z-30 text-white ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <div className="border-b-2 border-b-lightGreen py-2">
          <button
            onClick={() => handleMobileClick("/dashboard")}
            className="uppercase font-semibold text-2xl py-3 px-6 hover:scale-105 rounded-sm text-lightGreen "
          >
            <span>home</span>
          </button>
        </div>
        <div className="border-b-2 border-b-lightGreen py-2">
          <button
            onClick={() => handleMobileClick("/supplierMill")}
            className="uppercase font-semibold text-2xl py-3 px-6 hover:scale-105 text-lightGreen "
          >
            <span>supplier mill</span>
          </button>
        </div>
        <div className="border-b-2 border-b-lightGreen py-2">
          <button
            onClick={() => handleMobileClick("/supplierPlantation")}
            className="uppercase font-semibold text-2xl py-3 px-6 hover:scale-105 text-lightGreen"
          >
            <span>supplier plantation</span>
          </button>
        </div>
        <div className="py-2">
          <button
            onClick={() => handleMobileClick("/reporting")}
            className="uppercase font-semibold text-2xl py-3 px-6 hover:scale-105 text-lightGreen"
          >
            <span>reporting</span>
          </button>
        </div>
      </div>
      {/* menulink and active class properties are at css file, they are used to control the svg colors when hovered */}
      <div className="gap-7 py-1 hidden lg:flex">
        <button
          onClick={() => handleClick("/dashboard")}
          className={`menuLink flex items-center gap-2 px-3 py-3 rounded-3xl hover:text-white hover:bg-bgBlack ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          <img
            className="menu-svg scale-110 "
            src="HomeMenu.svg"
            alt="Home Icon"
          />
          <h1 className="font-semibold">Home</h1>
        </button>
        <button
          onClick={() => handleClick("/supplierMill")}
          className={`menuLink flex items-center gap-2 px-3 py-3 rounded-3xl hover:text-white hover:bg-bgBlack ${
            location.pathname === "/supplierMill" ? "active" : ""
          }`}
        >
          <img
            className="menu-svg scale-110"
            src="supplierMill.svg"
            alt="supplierMill Icon"
          />
          <h1 className="font-semibold">Supplier Mill</h1>
        </button>
        <button
          onClick={() => handleClick("/supplierPlantation")}
          className={`menuLink flex items-center gap-2 px-3 py-3 rounded-3xl hover:text-white hover:bg-bgBlack ${
            location.pathname === "/supplierPlantation" ? "active" : ""
          }`}
        >
          <img
            className="menu-svg scale-110  filter hover:invert"
            src="supplierPlantation.svg"
            alt="supplierPlantation Icon"
          />
          <h1 className="font-semibold">Supplier Plantation</h1>
        </button>
        <button
          onClick={() => handleClick("/reporting")}
          className={`menuLink flex items-center gap-2 px-3 py-3 rounded-3xl hover:text-white hover:bg-bgBlack ${
            location.pathname === "/reporting" ? "active" : ""
          }`}
        >
          <img
            className="menu-svg scale-110  hover:fill-white"
            src="Reporting.svg"
            alt="Reporting Icon"
          />
          <h1 className="font-semibold">Reporting</h1>
        </button>
      </div>
    </div>
  );
}
export default Menu;
