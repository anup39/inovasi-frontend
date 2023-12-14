import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUserId, setUserName } from "../../reducers/Auth";
import { setselectedDashboardPage } from "../../reducers/DisplaySettings";
import { RootState } from "../../store";
interface MyComponentProps {
  setSidebarOpened: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpened: boolean;
}

function Sidebar({ setSidebarOpened, sidebarOpened }: MyComponentProps) {
  const [millActive, setMillActive] = useState(false);
  // const [selectedItem, setSelectedItem] = useState("dashbboard");

  const selectedDashboardPage = useSelector(
    (state: RootState) => state?.displaySettings?.selectedDashboardPage
  );

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
  // useEffect(() => {
  //   const storedItem = localStorage.getItem("selectedItem");
  //   if (storedItem) {
  //     setSelectedItem(storedItem);
  //   } else {
  //     setSelectedItem("dashboard");
  //     localStorage.setItem("selectedItem", "dashboard");
  //   }
  // }, []);

  const handleItemClick = (item: string) => {
    dispatch(setselectedDashboardPage(item));
    navigate(`/${item}`);
  };
  return (
    <div
      className={`relative flex flex-col justify-between h-full bg-white text-grayText transition-all py-2 ease-out duration-75  ${
        sidebarOpened ? "w-[260px]" : "w-[50px]"
      }`}
    >
      {/* sidebar open/close button */}
      <div
        style={{ boxShadow: "2px 2px 8px 0px #00000033" }}
        className="bg-white  absolute rounded-md w-[28px] h-[28px] flex items-center justify-center -right-3 top-5 cursor-pointer "
        onClick={openSidebar}
      >
        <svg
          className={` transition-all delay-150 ${
            sidebarOpened ? "rotate-[90deg]" : "-rotate-[90deg]"
          }`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.47206 0.52827C1.21171 0.26792 0.789596 0.26792 0.529247 0.52827C0.268897 0.788619 0.268897 1.21073 0.529247 1.47108L4.52925 5.47108C4.7896 5.73143 5.21171 5.73143 5.47205 5.47108L9.47205 1.47108C9.7324 1.21073 9.7324 0.788619 9.47205 0.52827C9.21171 0.26792 8.7896 0.26792 8.52925 0.52827L5.00065 4.05687L1.47206 0.52827Z"
            fill="#000000"
          />
        </svg>
      </div>

      <div
        className={`flex h-full flex-col ${
          sidebarOpened ? "px-6" : "px-1"
        } border-r-2 border-gray-100`}
      >
        {" "}
        <img
          className={`mx-auto cursor-pointer ${
            sidebarOpened ? "scale-75" : "w-[144px] h-[54px]"
          }`}
          src="inovasilogo.svg"
          alt=""
        />
        {/* upper main div */}
        <div
          className={`flex flex-col justify-start py-7 gap-2 ${
            sidebarOpened ? "" : ""
          } `}
        >
          <p
            className={`text-sidebarText font-medium ${
              sidebarOpened ? "px-3" : "hidden"
            } `}
          >
            MAIN
          </p>

          {/* 4 items of dashboard */}
          {/* dashboard */}
          <div
            onClick={() => {
              // window.location.replace("/dashboard");
              // navigate("/dashboard");
              // setSelectedItem("dashboard");
              handleItemClick("dashboard");
            }}
            className={`py-2 hover:bg-boxDivider ${
              selectedDashboardPage === "dashboard"
                ? "bg-gradient-to-r from-footerHeading to-parrot text-white font-semibold"
                : ""
            } px-3 gap-2 cursor-pointer rounded-xl flex  items-center  `}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={``}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.99935 2.23145C9.23796 2.23145 8.49113 2.44007 7.83997 2.83466L3.67331 5.35966C3.06059 5.73095 2.55395 6.25397 2.20234 6.87819C1.85072 7.50241 1.666 8.20675 1.66602 8.92318V14.1665C1.66602 15.2716 2.105 16.3314 2.8864 17.1128C3.6678 17.8942 4.72761 18.3332 5.83268 18.3332H14.166C15.2711 18.3332 16.3309 17.8942 17.1123 17.1128C17.8937 16.3314 18.3327 15.2716 18.3327 14.1665V8.92235C18.3325 8.20608 18.1477 7.50176 17.7961 6.87774C17.4445 6.25372 16.938 5.73087 16.3254 5.35966L12.1587 2.83466C11.5076 2.44008 10.7607 2.23145 9.99935 2.23145ZM8.70373 4.26003C9.09443 4.02328 9.54252 3.89811 9.99935 3.89811C10.4562 3.89811 10.9043 4.02328 11.295 4.26003L15.4616 6.78503C15.8292 7.00776 16.1331 7.32147 16.3441 7.69589C16.555 8.07025 16.6659 8.49266 16.666 8.92235V14.1665C16.666 14.8296 16.4026 15.4654 15.9338 15.9343C15.4649 16.4031 14.8291 16.6665 14.166 16.6665H13.3327V14.1665C13.3327 13.2825 12.9815 12.4346 12.3564 11.8095C11.7312 11.1844 10.8834 10.8332 9.99935 10.8332C9.11529 10.8332 8.26745 11.1844 7.64233 11.8095C7.0172 12.4346 6.66601 13.2825 6.66601 14.1665V16.6665H5.83268C5.16964 16.6665 4.53376 16.4031 4.06491 15.9343C3.59607 15.4654 3.33268 14.8296 3.33268 14.1665V8.92318C3.33267 8.49332 3.4435 8.07069 3.65447 7.69616C3.86544 7.32163 4.16942 7.00782 4.53706 6.78504L8.70373 4.26003ZM11.1779 12.988C11.4904 13.3006 11.666 13.7245 11.666 14.1665V16.6665H8.33268V14.1665C8.33268 13.7245 8.50828 13.3006 8.82084 12.988C9.1334 12.6754 9.55732 12.4999 9.99935 12.4999C10.4414 12.4999 10.8653 12.6754 11.1779 12.988Z"
                fill={` ${
                  selectedDashboardPage === "dashboard" ? "#fff" : "#757575"
                }`}
              />
            </svg>
            <h1 className={` ${sidebarOpened ? "" : "hidden"} `}>Dashboard</h1>
          </div>
          {/* supplier mill */}
          <div
            onClick={() => {
              // window.location.replace("/suppliermill");
              // setSelectedItem("suppliermill");
              // navigate("/suppliermill");
              handleItemClick("suppliermill");
              setMillActive(!millActive);
              setSidebarOpened(true);
            }}
            className={`hover:bg-boxDivider ${
              selectedDashboardPage === "suppliermill"
                ? "bg-gradient-to-r from-footerHeading to-parrot text-white font-semibold"
                : ""
            } cursor-pointer py-2 px-3 rounded-xl flex items-center justify-between`}
          >
            <div className={`flex ${sidebarOpened ? "gap-2" : "gap-0"}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.79073 1C2.71032 1 1.81854 1.84137 1.76023 2.9157L1.00303 16.8657C0.940079 18.0253 1.86735 19 3.03352 19H5.59429C6.76047 19 7.68774 18.0253 7.62479 16.8657L6.86759 2.9157C6.80927 1.84137 5.91749 1 4.83709 1H3.79073ZM3.34898 2.98857C3.36842 2.63046 3.66568 2.35 4.02582 2.35C4.38596 2.35 4.74279 2.35 4.74279 2.35C5.10292 2.35 5.40019 2.63046 5.41963 2.98857C5.43907 3.34668 6.17683 16.9385 6.17683 16.9385C6.19781 17.3251 5.88873 17.65 5.5 17.65H3.26861C2.87988 17.65 2.5708 17.3251 2.59177 16.9385C2.59177 16.9385 3.32954 3.34668 3.34898 2.98857ZM7.71378 19C8.07112 18.629 8.33083 18.0151 8.4532 17.5H9.51051V13.825C9.51051 12.9552 10.2186 12.25 11.0921 12.25H14.7071C15.5806 12.25 16.2887 12.9552 16.2887 13.825V17.5H16.8222C17.1965 17.5 17.5 17.3478 17.5 16.975V6.5L12.9075 10.8543C12.7096 11.0362 12.4225 11.0842 12.1759 10.9766C11.9292 10.8691 11.7699 10.6264 11.7699 10.3583V6.5L8.1294 9.84648L8.03441 7.73826L11.988 4.10401C12.1858 3.92216 12.4729 3.87414 12.7196 3.98167C12.9662 4.08921 13.1256 4.33189 13.1256 4.6V8.4583L17.8624 4.10401C18.0603 3.92216 18.3474 3.87414 18.594 3.98167C18.8407 4.0892 19 4.33189 19 4.6V16.975C19 18.0933 18.0896 19 16.9665 19H7.71378ZM10.8661 13.825V17.5H14.9331V13.825C14.9331 13.7007 14.8319 13.6 14.7071 13.6H11.0921C10.9673 13.6 10.8661 13.7007 10.8661 13.825Z"
                  fill={`${
                    selectedDashboardPage === "suppliermill"
                      ? "#fff"
                      : "#757575"
                  }`}
                />
              </svg>
              <h1
                className={`font-medium ${sidebarOpened ? "w-full" : "hidden"}`}
              >
                Supplier Mill
              </h1>
            </div>

            {/* dropdown */}
            {/* <img
              onClick={() => setMillActive(!millActive)}
              className={`scale-[0.3] ${
                sidebarOpened ? "" : "hidden"
              } transition-transform ease-out transform ${
                millActive ? "rotate-180" : ""
              }`}
              src="dropdownIcon.svg"
              alt=""
            /> */}
            <div onClick={() => setMillActive(!millActive)}>
              <svg
                className={`${
                  sidebarOpened ? "" : "hidden"
                } transition-transform ease-out transform ${
                  millActive ? "rotate-180" : "rotate-[270deg]"
                }`}
                width="15"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.47206 0.52827C1.21171 0.26792 0.789596 0.26792 0.529247 0.52827C0.268897 0.788619 0.268897 1.21073 0.529247 1.47108L4.52925 5.47108C4.7896 5.73143 5.21171 5.73143 5.47205 5.47108L9.47205 1.47108C9.7324 1.21073 9.7324 0.788619 9.47205 0.52827C9.21171 0.26792 8.7896 0.26792 8.52925 0.52827L5.00065 4.05687L1.47206 0.52827Z"
                  fill={`${
                    selectedDashboardPage === "suppliermill"
                      ? "#fff"
                      : "#757575"
                  }`}
                />
              </svg>
            </div>
          </div>
          {/* container which opens when dropdown of mill clicked */}
          <div className={`pl-9 ${millActive ? "block " : "hidden"}`}>
            <ul className="space-y-1 relative">
              {/* this div is for that gray vertical line */}
              <div className="h-[155px] w-1 bg-gray-100 absolute -top-3 -left-4"></div>
              <div className="relative">
                <div className="w-4 h-2 absolute border-b-2  rounded-md rotate-[7deg] border-gra-100 top-4 -left-4"></div>
                <li className="p-2 hover:bg-gray-50 hover:font-medium text-sm rounded-lg cursor-pointer">
                  Deforestation Risk
                </li>
              </div>
              <div className="relative">
                <div className="w-4 h-2 absolute border-b-2  rounded-md rotate-[7deg] border-gra-100 top-4 -left-4"></div>
                <li className="p-2 hover:bg-gray-50 hover:font-medium text-sm rounded-lg cursor-pointer">
                  Legal PRF Risk
                </li>
              </div>
              <div className="relative">
                <div className="w-4 h-2 absolute border-b-2  rounded-md rotate-[7deg] border-gra-100 top-4 -left-4"></div>
                <li className="p-2 hover:bg-gray-50 hover:font-medium text-sm rounded-lg cursor-pointer">
                  Legal Land Use Risk
                </li>
              </div>
              <div className="relative">
                <div className="w-4 h-2 absolute border-b-2  rounded-md rotate-[7deg] border-gra-100 top-4 -left-4"></div>
                <li className="p-2 hover:bg-gray-50 hover:font-medium text-sm rounded-lg cursor-pointer">
                  Complex Supplybase Risk
                </li>
              </div>
            </ul>
          </div>
          {/* supplier plantation */}
          <div
            onClick={() => {
              // window.location.replace("/supplierplantation");
              // setSelectedItem("plantation");
              // navigate("/supplierplantation");
              handleItemClick("supplierplantation");
            }}
            className={`hover:bg-boxDivider ${
              selectedDashboardPage === "supplierplantation"
                ? "bg-gradient-to-r from-footerHeading to-parrot text-white font-semibold"
                : ""
            } flex items-center  cursor-pointer py-2 px-2 rounded-xl gap-2`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.85694 3C9.85694 4.47276 11.0508 5.66667 12.5236 5.66667C13.9964 5.66667 15.1903 4.47276 15.1903 3C15.1903 1.52724 13.9964 0.333336 12.5236 0.333336C11.0508 0.333336 9.85694 1.52724 9.85694 3ZM6.4283 3L6.4283 2.5H6.4283V3ZM3 5.99998H2.5H3ZM8.33292 9.61504L8.33084 10.115L8.33292 9.61504ZM4.90342 14.9795C4.90342 16.4523 6.09733 17.6462 7.57009 17.6462C9.04285 17.6462 10.2368 16.4523 10.2368 14.9795C10.2368 13.5068 9.04285 12.3129 7.57009 12.3129C6.09733 12.3129 4.90342 13.5068 4.90342 14.9795ZM12.5236 2.5L6.4283 2.5L6.4283 3.5L12.5236 3.5V2.5ZM6.4283 2.5C5.76532 2.5 4.81062 2.72574 4.00888 3.25902C3.1892 3.80423 2.5 4.69602 2.5 5.99998L3.5 5.99998C3.5 5.10485 3.9538 4.49666 4.5627 4.09165C5.18954 3.67471 5.94899 3.5 6.4283 3.5V2.5ZM2.5 5.99998C2.5 8.19116 4.5693 10.0994 8.33084 10.115L8.33501 9.11505C4.85936 9.10055 3.5 7.40877 3.5 5.99998L2.5 5.99998ZM8.33084 10.115C9.39602 10.1195 10.6068 10.0433 11.7922 9.98423C12.989 9.92458 14.1663 9.88181 15.207 9.94543C16.2591 10.0097 17.1056 10.1801 17.6764 10.5024C17.954 10.6591 18.154 10.8449 18.2864 11.0621C18.4179 11.2776 18.4999 11.552 18.5 11.9142L19.5 11.914C19.4999 11.393 19.3794 10.9337 19.1402 10.5414C18.902 10.1508 18.5632 9.85462 18.168 9.63156C17.3934 9.19426 16.3589 9.01397 15.2681 8.94729C14.1659 8.87991 12.9384 8.92586 11.7424 8.98547C10.535 9.04566 9.36494 9.11934 8.33501 9.11505L8.33084 10.115ZM18.5 11.9142C18.5002 12.7163 18.3074 13.2036 17.9833 13.5325C17.6446 13.876 17.0884 14.1236 16.1992 14.2791C15.3145 14.4338 14.1717 14.486 12.7272 14.4974C11.2793 14.5088 9.58582 14.4795 7.57009 14.4795V15.4795C9.55441 15.4795 11.2898 15.5087 12.7351 15.4973C14.1838 15.4859 15.3986 15.4342 16.3714 15.2641C17.3398 15.0948 18.1411 14.7968 18.6955 14.2345C19.2643 13.6573 19.5002 12.8783 19.5 11.914L18.5 11.9142Z"
                fill={`${
                  selectedDashboardPage === "supplierplantation"
                    ? "#fff"
                    : "#757575"
                }`}
              />
            </svg>

            <h1
              className={`font-medium ${sidebarOpened ? "w-full" : "hidden"} `}
            >
              Supplier Plantation
            </h1>
          </div>
          {/* reporting */}
          <div
            onClick={() => dispatch(setselectedDashboardPage("reporting"))}
            className={`hover:bg-boxDivider ${
              selectedDashboardPage === "reporting"
                ? "bg-gradient-to-r from-footerHeading to-parrot text-white font-semibold"
                : ""
            } cursor-pointer py-2 px-3 rounded-xl items items-center flex gap-2`}
          >
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66667 7.50016C4.20643 7.50016 3.83333 7.87326 3.83333 8.3335C3.83333 8.79373 4.20643 9.16683 4.66667 9.16683H11.3333C11.7936 9.16683 12.1667 8.79373 12.1667 8.3335C12.1667 7.87326 11.7936 7.50016 11.3333 7.50016H4.66667Z"
                fill={`${
                  selectedDashboardPage === "reporting" ? "#fff" : "#757575"
                }`}
              />
              <path
                d="M4.66667 10.8335C4.20643 10.8335 3.83333 11.2066 3.83333 11.6668C3.83333 12.1271 4.20643 12.5002 4.66667 12.5002H8C8.46024 12.5002 8.83333 12.1271 8.83333 11.6668C8.83333 11.2066 8.46024 10.8335 8 10.8335H4.66667Z"
                fill={`${
                  selectedDashboardPage === "reporting" ? "#fff" : "#757575"
                }`}
              />
              <path
                d="M4.66667 14.1668C4.20643 14.1668 3.83333 14.5399 3.83333 15.0002C3.83333 15.4604 4.20643 15.8335 4.66667 15.8335H11.3333C11.7936 15.8335 12.1667 15.4604 12.1667 15.0002C12.1667 14.5399 11.7936 14.1668 11.3333 14.1668H4.66667Z"
                fill={`${
                  selectedDashboardPage === "reporting" ? "#fff" : "#757575"
                }`}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.399 4.28148C15.3319 4.11918 15.2335 3.97172 15.1093 3.84757L12.4863 1.22461C12.2365 0.974488 11.8976 0.833808 11.5441 0.833496H1.83333C1.47971 0.833496 1.14057 0.973972 0.890524 1.22402C0.640476 1.47407 0.5 1.81321 0.5 2.16683V17.8335C0.5 18.0086 0.534488 18.182 0.601494 18.3437C0.668499 18.5055 0.766711 18.6525 0.890524 18.7763C1.01433 18.9001 1.16132 18.9983 1.32309 19.0653C1.48486 19.1323 1.65824 19.1668 1.83333 19.1668H14.1667C14.3418 19.1668 14.5151 19.1323 14.6769 19.0653C14.8387 18.9983 14.9857 18.9001 15.1095 18.7763C15.2333 18.6525 15.3315 18.5055 15.3985 18.3437C15.4655 18.182 15.5 18.0086 15.5 17.8335V4.79209L14.6667 4.79183L15.5 4.79387L15.5 4.79209C15.5002 4.6169 15.4659 4.4434 15.399 4.28148ZM10.5 4.5835C10.5 5.27385 11.0596 5.8335 11.75 5.8335H13.8333V17.5002H2.16667V2.50016H10.5V4.5835ZM13.0715 4.16683L12.1667 3.26201V4.16683H13.0715Z"
                fill={`${
                  selectedDashboardPage === "reporting" ? "#fff" : "#757575"
                }`}
              />
            </svg>
            <h1
              className={`font-medium ${sidebarOpened ? "w-full" : "hidden"} `}
            >
              Report
            </h1>
          </div>

          {/* horizontal divider */}
          <div className="my-5 h-0.5 bg-gray-100"></div>
          {/* div with settings */}
          <div className="flex flex-col px-3 gap-2">
            <p
              className={`text-sidebarText font-medium ${
                sidebarOpened ? "uppercase px-1" : "hidden"
              } `}
            >
              settings
            </p>
            <div
              className={`hover:bg-boxDivider cursor-pointer py-2 ${
                sidebarOpened ? "px-0" : "px-0"
              }  rounded-xl flex justify-between`}
            >
              <div className="flex gap-2">
                <img src="settingsIcon.svg" alt="" />
                <p
                  className={`font-medium ${
                    sidebarOpened ? "w-full" : "hidden"
                  } `}
                >
                  Settings
                </p>
              </div>
              <img
                className={`scale-[0.3] ${sidebarOpened ? "" : "hidden"} `}
                src="dropdownIcon.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* lower div with name, help, logout */}
        <div className="flex flex-col justify-end gap-10 flex-1">
          {/* img, name and company name */}
          <div className="flex gap-3 items-center cursor-pointer">
            <img
              className={`rounded-full ${
                sidebarOpened ? "h-9 w-9" : "h-8 w-8 mx-auto"
              } `}
              src="testimonyphoto.png"
              alt=""
            />
            <div className={` ${sidebarOpened ? "flex flex-col" : "hidden"} `}>
              <h1 className="font-semibold text-sm text-black">Beni Beni</h1>
              <p className="text-sm uppercase font-medium text-grayText">
                Company Name
              </p>
            </div>
          </div>
          {/* {/* help and logout */}
          <div className="flex flex-col gap-5">
            <div
              className={`flex cursor-pointer items-center gap-3 ${
                sidebarOpened ? "" : "mx-auto"
              } `}
            >
              <img src="helpIcon.svg" alt="" />
              <p
                className={`font-medium ${sidebarOpened ? "block" : "hidden"} `}
              >
                Help
              </p>
            </div>
            <div
              onClick={handleLogout}
              className={`flex cursor-pointer items-center gap-3 text-redText ${
                sidebarOpened ? "" : "mx-auto"
              } `}
            >
              <img
                className={` ${sidebarOpened ? "scale-105" : ""} `}
                src="logoutIcon.svg"
                alt=""
              />
              <h1 className={`font-medium ${sidebarOpened ? "" : "hidden"} `}>
                Logout Account
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
