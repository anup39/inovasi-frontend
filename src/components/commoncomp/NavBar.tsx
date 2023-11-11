import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
function NavBar() {
  return (
    <div className="flex justify-between px-5 items-center py-1 bg-white">
      <div className="font-bold">@ InovasiAgriplot </div>
      <div className="flex justify-center items-center space-x-4">
        <div className="iconDiv relative pr-5">
          <FontAwesomeIcon className="scale-150" icon={faBell} />
          <div className="absolute bottom-3 left-2 bg-gray-400  rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            2
          </div>
        </div>
        <div className="flex flex-col items-end">
          <h1 className="font-semibold text-lg">Renee McKelvey</h1>
          <p className="text-sm text-gray-400">Company Name</p>
        </div>
        <img className="w-10 h-10" src="src\assets\osgeo_nepal.png" alt="" />{" "}
      </div>
    </div>
  );
}
export default NavBar;
