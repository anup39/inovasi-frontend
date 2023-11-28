import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUserId, setUserName } from "../../reducers/Auth";

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
    <div className="flex justify-between px-5 py-2 lg:py-0 items-center bg-white ">
      <div className="flex items-center flex-row-reverse lg:flex-row gap-8">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="h-5 md:h-7 lg:h-8"
          src="ivovasi-Logo.png"
          alt=""
        />
        <Menu />
        <button
          className="uppercase py-1 px-5 hover:scale-105 rounded-sm bg-lightGreen text-white hidden lg:block"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <div className="relative pr-5 scale-50 md:scale-75 lg:scale-90">
          <FontAwesomeIcon className="scale-150" icon={faBell} />
          <div className="absolute bottom-3 left-2 bg-gray-400  rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            2
          </div>
        </div>
        <div className=" flex-col items-end scale-[0.9] hidden lg:flex">
          <h1 className="font-semibold text-sm lg:text-md">Inovasi Digital</h1>
          <p className="text-sm text-gray-400">Company Name</p>
        </div>
        <img
          className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
          src="testimonyphoto.png"
          alt=""
        />{" "}
        <button
          className="uppercase py-1 px-2 text-sm hover:scale-105 rounded-sm bg-lightGreen text-white block lg:hidden"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </div>
  );
}
export default NavBar;
