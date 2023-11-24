import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
function NavBar() {
  return (
    <div className="flex justify-between px-5 items-center bg-white ">
      <div className="flex items-center flex-row-reverse lg:flex-row gap-8">
        <img className="h-8" src="ivovasi-Logo.png" alt="" />
        <Menu />
      </div>

      <div className="flex justify-center items-center space-x-4">
        <div className="relative pr-5 scale-90">
          <FontAwesomeIcon className="scale-150" icon={faBell} />
          <div className="absolute bottom-3 left-2 bg-gray-400  rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            2
          </div>
        </div>
        <div className="flex flex-col items-end">
          <h1 className="font-semibold text-md">Inovasi Digital</h1>
          <p className="text-sm text-gray-400">Company Name</p>
        </div>
        <img className="w-9 h-9" src="testimonyphoto.png" alt="" />{" "}
      </div>
    </div>
  );
}
export default NavBar;
