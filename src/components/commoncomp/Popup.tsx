import axios from "axios";
import {
  settoastType,
  settoastMessage,
  setshowToast,
} from "../../reducers/DisplaySettings";
import { useDispatch } from "react-redux";

interface PopupProps {
  properties: {
    id: number;
    // @ts-ignore
    [key: string]: number | string;
  };
  trace: boolean;
}

const Popup = ({ properties, trace }: PopupProps) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const propertyElements = Object.entries(properties).map(([key, value]) => (
    <div key={key} className="mb-2 truncate">
      <strong className="mr-1">{key}:</strong> {value}
    </div>
  ));

  const handleTraceplantation = () => {
    console.log(properties.mill_eq_id);
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
              "No  Agriplot (TTP not found) for this mill supplier yet. Try another"
            )
          );
          dispatch(settoastType("info"));
        }
        if (res.data.length > 0) {
          console.log(JSON.stringify(res.data), "res data");
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
                window.location.replace(`/supplierplantation`);
              } else {
                dispatch(setshowToast(true));
                dispatch(
                  settoastMessage(
                    "No Agriplot for this mill supplier yet. Try another"
                  )
                );
                dispatch(settoastType("info"));
              }
            });
        }
      });
  };

  return (
    <>
      {properties ? (
        <div className="bg-white rounded shadow-md p-4 max-w-xs md:max-w-sm max-h-48  overflow-auto">
          {trace ? (
            <button
              onClick={handleTraceplantation}
              style={{
                backgroundColor: "#15999D",
                margin: "2px",
                border: "1px solid black",
                borderRadius: "3px",
              }}
            >
              Trace Plantation
            </button>
          ) : null}
          <div className="divide-y divide-gray-200">{propertyElements}</div>
        </div>
      ) : null}
    </>
  );
};

export default Popup;
