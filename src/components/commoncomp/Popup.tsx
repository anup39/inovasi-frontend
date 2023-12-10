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
      className={`absolute bottom-10 right-1 flex-1 bg-white  rounded-lg ${
        popup ? "" : ""
      } `}
    >
      <div className="flex flex-col relative items-center justify-between  p-3">
        <div className="flex items-center justify-between w-full ">
          <h1 className="font-bold uppercase hidden md:block">information</h1>
          <button className="border border-darkGreen w-full md:w-max  rounded-lg text-darkGreen font-semibold px-4 py-2 text-xs md:text-[8px] lg:text-xs">
            Trace to Plantation
          </button>
        </div>
        <div
          onClick={() => setPopup(!popup)}
          className={`absolute w-7 transition-all ${
            popup ? "rotate-180" : ""
          } -top-4 md:-top-3 -translate-x-1/2 right-1/2 left-1/2 aspect-square rounded-full border-darkGreen border bg-white z-10 flex items-center justify-center cursor-pointer`}
        >
          <img className="" src="popuparrow.svg" alt="" />
        </div>
        {properties ? (
          <div
            className={`bg-white rounded shadow-md p-2 max-w-sm ${
              popup ? "block" : "hidden"
            }  md:max-w-md max-h-48 overflow-auto`}
          >
            {trace ? (
              <button
                onClick={handleTraceplantation}
                className=" text-bg-dark-green border-t border border-bg-green border-r border-b border-1 font-semibold p-2 rounded-lg ml-auto justify-content-right flex justify-end "
              >
                Trace Plantation
              </button>
            ) : null}
            {/* <div className="font-bold text-base mt-0">INFORMATION</div> */}
            <div className="divide-y divide-gray-200  mt-3  ">
              {propertyElements}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Popup;
