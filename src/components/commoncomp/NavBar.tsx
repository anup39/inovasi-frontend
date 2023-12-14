// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
// import Menu from "./Menu";
import "../../css/common/NavBar.css";

function NavBar() {
  return (
    <div className="px-6  flex items-center justify-end md:justify-between bg-gray-50 border-b-2 h-[96px]">
      <div className="hidden md:block">
        <h1 className="font-semibold text-[30px] text-semiBlackText">
          Dashboard
        </h1>
      </div>
      <div className="flex justify-center  items-center gap-2  md:gap-5">
        <div className="flex scale-75 h-[42px] w-[150px] md:scale-100 gap-1 md:gap-3 py-1 md:py-2 px-2 md:px-4 rounded-lg border items-center justify-center border-grayBorder cursor-pointer">
          <p className="text-grayText text-xs md:text-normal">Commodity</p>
          <img src="dropdownIcon.svg" alt="" />
        </div>
        <div className="relative">
          <div
            // className="bg-searchGray rounded-lg p-2 md:pl-10 md:min-w-[400px] w-5/6  placeholder:text-grayText placeholder:text-xs"
            // placeholder="Search here..."
            // type="search"
            // name=""
            id="geocoding-search"
          />
          <img
            className="scale-90 hidden md:block absolute top-1/2 transform -translate-y-1/2 left-3 cursor-pointer"
            src="SearchIcon.svg"
            alt=""
          />
        </div>
        <div className="relative">
          <img
            className="bg-veryLightGreen p-2 rounded-lg min-w-[30px] min-h-[20px] scale-90 cursor-pointer rotate-animation"
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
