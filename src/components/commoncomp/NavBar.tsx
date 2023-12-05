// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
// import Menu from "./Menu";
import "../../css/common/NavBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUserId, setUserName } from "../../reducers/Auth";
import Sidebar from "./Sidebar";

function NavBar() {
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
    // this was old navbar, leaving it here just so it maybe usable sometime later
    // <div className="flex justify-between px-5 py-2 lg:py-0 items-center bg-white ">
    //   <div className="flex items-center flex-row-reverse lg:flex-row gap-8">
    //     <img
    //       onClick={() => {
    //         navigate("/");
    //       }}
    //       className="h-5 md:h-7 lg:h-8"
    //       src="inovasilogo.svg"
    //       alt=""
    //     />
    //     <Menu />
    //     <button
    //       className="uppercase py-1 px-5 hover:scale-105 rounded-sm bg-lightGreen text-white hidden lg:block"
    //       onClick={handleLogout}
    //     >
    //       logout
    //     </button>
    //   </div>

    //   <div className="flex justify-center items-center space-x-4">
    //     <div className="relative pr-5 scale-50 md:scale-75 lg:scale-90">
    //       <FontAwesomeIcon className="scale-150" icon={faBell} />
    //       <div className="absolute bottom-3 left-2 bg-gray-400  rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
    //         2
    //       </div>
    //     </div>
    //     <div className=" flex-col items-end scale-[0.9] hidden lg:flex">
    //       <h1 className="font-semibold text-sm lg:text-md">Inovasi Digital</h1>
    //       <p className="text-sm text-gray-400">Company Name</p>
    //     </div>
    //     <img
    //       className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
    //       src="testimonyphoto.png"
    //       alt=""
    //     />{" "}
    //     <button
    //       className="uppercase py-1 px-2 text-sm hover:scale-105 rounded-sm bg-lightGreen text-white block lg:hidden"
    //       onClick={handleLogout}
    //     >
    //       logout
    //     </button>
    //   </div>
    // </div>
    <div className="px-6 py-2 flex items-center justify-end md:justify-between bg-gray-50 border-b-2 h-[50px]">
      <div className="hidden md:block">
        <h1 className="font-bold">Dashboard</h1>
      </div>
      <div className="flex  items-center gap-5">
        <div className="relative">
          <input
            className="bg-searchGray rounded-lg p-2 md:pl-10 lg:min-w-[400px] placeholder:text-grayText"
            placeholder="Search here..."
            type="search"
            name=""
            id=""
          />
          <img
            className="scale-90 hidden md:block absolute top-1/2 transform -translate-y-1/2 left-3 cursor-pointer"
            src="searchIcon.svg"
            alt=""
          />
        </div>
        <div className="relative">
          <img
            className="bg-veryLightGreen p-2 rounded-lg scale-90 cursor-pointer rotate-animation"
            src="bellIcon.svg"
            alt=""
          />
          <div className=" absolute h-2 w-2 rounded-full top-2 right-1 bg-bellRed"></div>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
