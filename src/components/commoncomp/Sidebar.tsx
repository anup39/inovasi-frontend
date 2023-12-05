import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUserId, setUserName } from "../../reducers/Auth";
interface MyComponentProps {
  setSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpened: boolean;
}

function Sidebar({ setSidebarOpened, sidebarOpened }: MyComponentProps) {
  const [millActive, setMillActive] = useState(false);

  function openSidebar() {
    setSidebarOpened(!sidebarOpened);
    setMillActive(false);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    dispatch(setToken(""));
    dispatch(setUserId(""));
    dispatch(setUserName(""));
    navigate("/");
    window.location.reload();
  };
  return (
    <div
      className={`relative flex h-screen bg-white text-grayText transition-all ease-in-out duration-75  ${
        sidebarOpened ? "w-[255px]" : "w-[50px]"
      }`}
    >
      <div
        className=" absolute -right-4 top-10 cursor-pointer "
        onClick={openSidebar}
      >
        <img
          className={`scale-110 p-3 bg-white shadow shadow-gray-300 rounded-lg rotate-90 transition-all ${
            sidebarOpened ? "" : "rotate-[270deg]"
          }`}
          src="dropdownIcon.svg"
          alt=""
        />
      </div>
      {/* main container div */}
      <div
        className={`flex flex-col flex-grow justify-between ${
          sidebarOpened ? "px-7" : "px-1"
        } py-4 h-full border-r-2 border-gray-100`}
      >
        {/* upper with img, main and settings */}
        <div className={` ${sidebarOpened ? "" : "w-9 h-9"} `}>
          <img
            className={`mx-auto pb-5 ${sidebarOpened ? "scale-75" : ""}`}
            src="inovasilogo.svg"
            alt=""
          />
          <div>
            <p className={` ${sidebarOpened ? "pb-3" : "hidden"} `}>MAIN</p>
            <div
              className={` flex flex-col gap-1 ${sidebarOpened ? "" : "pt-9"} `}
            >
              {/* 4 items of dashboard */}
              <div
                onClick={() => {
                  window.location.replace("/dashboard");
                }}
                className="p-3 gap-2 cursor-pointer rounded-xl flex text-white items-center  bg-gradient-to-r from-footerHeading to-parrot"
              >
                <img className="" src="dashboardIcon.svg" alt="" />
                <h1 className={` ${sidebarOpened ? "" : "hidden"} `}>
                  Dashboard
                </h1>
              </div>
              <div className="hover:bg-gray-50 cursor-pointer p-2 rounded-xl flex justify-between">
                <div
                  onClick={() => {
                    window.location.replace("/suppliermill");
                  }}
                  className={` ${sidebarOpened ? "flex gap-2" : "gap-0"} `}
                >
                  <img
                    className={`opacity-50 `}
                    src="supplierMillDash.svg"
                    alt=""
                  />
                  <h1 className={` ${sidebarOpened ? "w-full" : "hidden"} `}>
                    Supplier Mill
                  </h1>
                </div>
                <img
                  onClick={() => setMillActive(!millActive)}
                  className={`scale-[0.3] ${
                    sidebarOpened ? "" : "hidden"
                  } transition-transform transform ${
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

              <div
                onClick={() => {
                  window.location.replace("/supplierplantation");
                }}
                className="hover:bg-gray-50  cursor-pointer p-2 rounded-xl flex gap-2"
              >
                <img className=" opacity-70" src="traceToPlotDash.svg" alt="" />
                <h1 className={` ${sidebarOpened ? "w-full" : "hidden"} `}>
                  Trace to Plot
                </h1>
              </div>
              <div className="hover:bg-gray-50  cursor-pointer p-2 rounded-xl flex gap-2">
                <img className=" opacity-70" src="reportDashIcon.svg" alt="" />
                <h1 className={` ${sidebarOpened ? "w-full" : "hidden"} `}>
                  Report
                </h1>
              </div>
            </div>
          </div>
          {/* horizontal divider */}
          <div className="mt-1 h-1 bg-gray-100"></div>
          {/* div with settings */}
          <div className="pt-1">
            <p className={` ${sidebarOpened ? "uppercase" : "hidden"} `}>
              settings
            </p>
            <div className="hover:bg-gray-50 cursor-pointer p-2 rounded-xl flex justify-between mt-2">
              <div className="flex gap-2">
                <img src="settingsIcon.svg" alt="" />
                <h1 className={` ${sidebarOpened ? "w-full" : "hidden"} `}>
                  Settings
                </h1>
              </div>
              <img
                className={` ${sidebarOpened ? "" : "hidden"} `}
                src="dropdownIcon.svg"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* lower div with name, help, logout */}
        <div className="flex flex-col justify-end gap-4">
          {/* img, name and company name */}
          <div className="flex gap-3 pb-2 items-center">
            <img
              className={`rounded-full ${
                sidebarOpened ? "h-10 w-10" : "h-8 w-8 mx-auto"
              } `}
              src="testimonyphoto.png"
              alt=""
            />
            <div className={` ${sidebarOpened ? "flex flex-col" : "hidden"} `}>
              <h1 className="font-semibold text-black">Beni Beni</h1>
              <p className="uppercase text-grayText">Company Name</p>
            </div>
          </div>
          {/* help and logout */}
          <div className={`flex gap-2 ${sidebarOpened ? "" : "mx-auto"} `}>
            <img src="helpIcon.svg" alt="" />
            <h1 className={` ${sidebarOpened ? "flex flex-col" : "hidden"} `}>
              Help
            </h1>
          </div>
          <div
            onClick={handleLogout}
            className={`flex gap-2 text-redText ${
              sidebarOpened ? "" : "mx-auto"
            } `}
          >
            <img
              className={` ${sidebarOpened ? "scale-105" : ""} `}
              src="logoutIcon.svg"
              alt=""
            />
            <h1 className={` ${sidebarOpened ? "" : "hidden"} `}>
              Logout Account
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
