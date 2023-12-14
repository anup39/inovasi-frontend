import axios from "axios";
import {
  settoastType,
  settoastMessage,
  setshowToast,
} from "../../reducers/DisplaySettings";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface PopupProps {
  properties: {
    [key: string]: string | number;
    id: number;
    mill_name: string;
    mill_eq_id: string;
    mill_long: string;
    mill_lat: string;
  };
  trace: boolean;
}

const Popup = ({ properties, trace }: PopupProps) => {
  const [popup, setPopup] = useState(true);
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const propertyElements = properties
    ? Object.entries(properties).map(([key, value]) => (
        <div key={key} className="mb-2 truncate">
          <strong className="mr-1">{key}:</strong> {value}
        </div>
      ))
    : null; // Or a default value if appropriate
  const handleTraceplantation = () => {
    axios
      .get(
        `${import.meta.env.VITE_API_DASHBOARD_URL}/ttp/?mill_eq_id=${
          properties.mill_eq_id
        }`
      )
      .then((res) => {
        if (res.data.length == 0) {
          dispatch(setshowToast(true));
          dispatch(
            settoastMessage(
              "No  Agriplot (TTP not found) for this mill supplier yet."
            )
          );
          dispatch(settoastType("error"));
        }
        if (res.data.length > 0) {
          const estateids = res.data;
          axios
            .get(
              `${
                import.meta.env.VITE_API_DASHBOARD_URL
              }/agriplot-result/?estateids=${JSON.stringify(estateids)}`
            )
            .then((res) => {
              if (res.data.length > 0) {
                localStorage.setItem("estateids", JSON.stringify(estateids));
                localStorage.setItem("mill_name", properties.mill_name);
                localStorage.setItem("mill_id", properties.mill_eq_id);
                localStorage.setItem("mill_long", properties.mill_long);
                localStorage.setItem("mill_lat", properties.mill_lat);

                window.location.replace(`/supplierplantation`);
              } else {
                dispatch(setshowToast(true));
                dispatch(
                  settoastMessage(
                    "No Agriplot for this mill supplier yet. Try another"
                  )
                );
                dispatch(settoastType("error"));
              }
            });
        }
      });
  };

  return (
    <div
      className={`flex-1 bg-white min-w-[200px]  md:min-w-[350px] max-h-[200px] max-w-xs rounded-lg `}
    >
      <div className="flex flex-col relative items-center justify-between  p-3">
        <div className="flex items-center justify-between w-full ">
          <h1 className="font-normal hidden md:font-bold uppercase text-[9px] md:text-sm mx-auto md:mx-0 md:block">
            information
          </h1>

          {trace ? (
            <button
              onClick={handleTraceplantation}
              className="border border-darkGreen w-full md:w-max  rounded-lg text-darkGreen font-semibold  px-1 py-2 text-xs md:text-[7px] lg:text-[10px]"
            >
              Trace to Plantation
            </button>
          ) : null}
        </div>
        <div
          onClick={() => setPopup(!popup)}
          className={`absolute w-7 transition-all  ${
            popup ? "rotate-180" : ""
          } -top-4 md:-top-3 -translate-x-1/2 right-1/2 left-1/2  aspect-square rounded-full border-darkGreen border bg-white z-10 flex items-center justify-center cursor-pointer`}
        >
          <img className="scale-75 md:scale-100" src="popuparrow.svg" alt="" />
        </div>
        {properties ? (
          <div
            className={`bg-white rounded max-w-[200px] md:min-w-[350px] p-2 overflow-scroll overflow-y-scroll ${
              popup ? "block" : "hidden"
            }  md:max-w-xs max-h-[150px] md:max-h-52 `}
          >
            {/* <button
                onClick={handleTraceplantation}
                className="max-w-xs  text-bg-dark-green border-t border border-bg-green border-r border-b border-1 font-semibold p-1 rounded-lg ml-auto justify-content-right flex justify-end "
              >
                Trace Plantation
              </button>
            ) : null} */}
            {/* <div className="font-bold text-base mt-0">INFORMATION</div> */}
            <div className="divide-y divide-gray-200   mt-3  ">
              {propertyElements && propertyElements.length > 0 ? (
                propertyElements
              ) : (
                <p>Hover on map layer for info</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Popup;
