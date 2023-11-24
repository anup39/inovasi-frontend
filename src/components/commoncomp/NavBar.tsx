import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
function NavBar() {
  return (
    <div className="flex justify-between px-5 items-center bg-white ">
      <div className="flex items-center flex-row-reverse lg:flex-row gap-8">
        <img
          className="h-5 md:h-7 lg:h-8"
          src="https://maps.agriplot.earth/assets/logolong-bbde4d32.png"
          alt=""
        />
        <Menu />
      </div>

      <div className="flex justify-center items-center space-x-4">
        <div className="relative pr-5 scale-50 md:scale-75 lg:scale-90">
          <FontAwesomeIcon className="scale-150" icon={faBell} />
          <div className="absolute bottom-3 left-2 bg-gray-400  rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            2
          </div>
        </div>
        <div className="flex flex-col items-end scale-[0.9]">
          <h1 className="font-semibold text-sm lg:text-md">Inovasi Digital</h1>
          <p className="text-sm text-gray-400">Company Name</p>
        </div>
        <img
          className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
          src="testimonyphoto.png"
          alt=""
        />{" "}
      </div>
    </div>
  );
}
export default NavBar;
