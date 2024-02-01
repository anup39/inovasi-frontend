import "../../css/common/NavBar.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function NavBar() {
  const selectedDashboardPage = useSelector(
    (state: RootState) => state.displaySettings.selectedDashboardPage
  );

  return (
    <div className="px-[10px] md:px-[47px] py-[10px] lg:py-[20px] flex items-center justify-start md:justify-between bg-gray-50 border-b-2 h-[50px] md:h-[96px]">
      <div className="hidden md:block">
        <h1 className="font-semibold text-[30px] text-semiBlackText">
          {selectedDashboardPage === "dashboard"
            ? "Dashboard"
            : selectedDashboardPage === "suppliermill"
            ? "Supplier Mill"
            : "Supplier Plantation"}
        </h1>
      </div>
      <div className="flex justify-center  items-center gap-[10px] md:gap-[30px] ">
        <div className="flex scale-75 h-[42px] w-[150px] md:scale-100 gap-[30px] rounded-lg border items-center justify-center border-grayBorder cursor-pointer">
          <p className="text-grayText text-xs md:text-normal">Commodity</p>
          <img src="dropdownIcon.svg" alt="" />
        </div>
        {/* <div className="relative"> */}
        {/* <div
          // className="bg-searchGray rounded-lg p-2 md:pl-10 md:min-w-[400px] w-5/6  placeholder:text-grayText placeholder:text-xs"
          // placeholder="Search here..."
          // type="search"
          // name=""
          id="geocoding-search"
        /> */}
        {/* <img
          className="scale-90 hidden md:block absolute top-1/2 transform -translate-y-1/2 left-3 cursor-pointer"
          src="SearchIcon.svg"
          alt=""
        /> */}
        {/* </div> */}
        <div className="relative scale-75 md:scale-100 w-[42px] flex items-center justify-center h-[42px] bg-veryLightGreen rounded-lg cursor-pointer">
          <img className="" src="bellIcon.svg" alt="" />
          <div className=" absolute h-[6.67px] w-[6.67px] rounded-full top-[6px] right-[6px] bg-bellRed"></div>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
