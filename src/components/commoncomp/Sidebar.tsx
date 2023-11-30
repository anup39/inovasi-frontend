import { useState } from "react";

function Sidebar() {
  const [millActive, setMillActive] = useState(false);
  const [openDash, setOpenDash] = useState(true);
  return (
    // this will take up all vh and given w full, will give the parent div the width
    <div
      className={`relative flex w-[350px] h-screen bg-white text-grayText transition-transform ease-in transform ${
        openDash ? "-translate-x-[285px]" : ""
      }`}
    >
      <div
        className=" absolute -right-4 top-10 cursor-pointer "
        onClick={() => setOpenDash(!openDash)}
      >
        <img
          className={`scale-110 p-3 bg-white shadow shadow-gray-300 rounded-lg rotate-90 transition-all ${
            openDash ? "rotate-[270deg]" : ""
          }`}
          src="dropdownIcon.svg"
          alt=""
        />
      </div>
      {/* main container div */}
      <div className="flex flex-col flex-grow justify-between px-7 py-4 h-full border-r-2 border-gray-100">
        {/* upper with img, main and settings */}
        <div className="">
          <img className="mx-auto pb-6" src="ivovasi-Logo.png" alt="" />
          <div>
            <p className="pb-4">MAIN</p>
            <div className="flex flex-col gap-1">
              {/* 4 items of dashboard */}
              <div className="p-3 gap-2 cursor-pointer rounded-xl flex text-white items-center  bg-gradient-to-r from-[#02C685] to-[#8ADF5E]">
                <img className="" src="dashboardIcon.svg" alt="" />
                <h1>Dashboard</h1>
              </div>
              <div
                className="hover:bg-gray-50 cursor-pointer p-2 rounded-xl flex justify-between"
                onClick={() => setMillActive(!millActive)}
              >
                <div className="flex gap-2">
                  <img
                    className=" opacity-50"
                    src="supplierMillDash.svg"
                    alt=""
                  />
                  <h1 className="w-full">Supplier Mill</h1>
                </div>
                <img
                  className={`scale-[0.3] transition-transform transform ${
                    millActive ? "rotate-180" : ""
                  }`}
                  src="dropdownIcon.svg"
                  alt=""
                />
              </div>
              {/* container which opens when dropdown of mill clicked */}
              <div className={`pl-10 ${millActive ? "block " : "hidden"}`}>
                <ul className="space-y-1 relative">
                  {/* this div is for that gray vertical line */}
                  <div className="h-[170px] w-1 bg-gray-100 absolute -top-3 -left-4"></div>
                  <div className="relative">
                    <div className="w-4 h-2 absolute border-b-2  rounded-md rotate-[7deg] border-gra-100 top-4 -left-4"></div>
                    <li className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      Deforestation Risk
                    </li>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-2 absolute border-b-2  rounded-md rotate-[7deg] border-gra-100 top-4 -left-4"></div>
                    <li className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      Legal PRF Risk
                    </li>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-2 absolute border-b-2  rounded-md rotate-[7deg] border-gra-100 top-4 -left-4"></div>
                    <li className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      Legal Land Use Risk
                    </li>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-2 absolute border-b-2  rounded-md rotate-[7deg] border-gra-100 top-4 -left-4"></div>
                    <li className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      Complex Supplybase Risk
                    </li>
                  </div>
                </ul>
              </div>

              <div className="hover:bg-gray-50  cursor-pointer p-2 rounded-xl flex gap-2">
                <img className=" opacity-70" src="traceToPlotDash.svg" alt="" />
                <h1>Trace to Plot</h1>
              </div>
              <div className="hover:bg-gray-50  cursor-pointer p-2 rounded-xl flex gap-2">
                <img className=" opacity-70" src="reportDashIcon.svg" alt="" />
                <h1>Report</h1>
              </div>
            </div>
          </div>
          {/* horizontal divider */}
          <div className="mt-1 h-1 bg-gray-100"></div>
          {/* div with settings */}
          <div className="pt-1">
            <p className="uppercase">settings</p>
            <div className="hover:bg-gray-50 cursor-pointer p-2 rounded-xl flex justify-between">
              <div className="flex gap-2">
                <img src="settingsIcon.svg" alt="" />
                <h1 className="w-full">Settings</h1>
              </div>
              <img src="dropdownIcon.svg" alt="" />
            </div>
          </div>
        </div>

        {/* lower div with name, help, logout */}
        <div className="flex flex-col justify-end gap-4">
          {/* img, name and company name */}
          <div className="flex gap-3 pb-2 items-center">
            <img
              className="h-10 w-10 rounded-full"
              src="testimonyphoto.png"
              alt=""
            />
            <div className="flex flex-col ">
              <h1 className="font-semibold text-black">Beni Beni</h1>
              <p className="uppercase text-grayText">Company Name</p>
            </div>
          </div>
          {/* help and logout */}
          <div className="flex gap-2">
            <img src="helpIcon.svg" alt="" />
            <h1>Help</h1>
          </div>
          <div className="flex gap-2 text-redText">
            <img src="logoutIcon.svg" alt="" />
            <h1>Logout Account</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
