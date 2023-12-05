import axios from "axios";
import {
  settoastType,
  settoastMessage,
  setshowToast,
} from "../../reducers/DisplaySettings";
import { useDispatch } from "react-redux";

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
    <>
      {properties ? (
        <div className="bg-white   rounded shadow-md w-70 h-60 p-2 max-w-sm    overflow-auto flex flex-direction-column relative mr-20 ">
          {trace ? (
            <button
              onClick={handleTraceplantation}
              className="text-bg-dark-green mt-2 border border-green-600  border-bg-green border-r border-b border-10 font-semibold p-1 rounded-lg absolute top-0  right-2 bottom-35 p-2 ml-auto justify-content-right flex"
            >
              Trace Plantation

            </button>
          
          ) : null}
        <div className="font-bold text-base mt-2">INFORMATION</div>
          <div className="divide-y divide-gray-200 mt-10 mr-1000px" style={{   scrollbarWidth: "thin" }}  
          >
            {propertyElements}
          </div>
        </div>
       
      ) : null}
    </>
  );
};

export default Popup;
