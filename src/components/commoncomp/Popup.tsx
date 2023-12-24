import axios from "axios";
import {
  settoastType,
  settoastMessage,
  setshowToast,
  setIsAgriplot,
} from "../../reducers/DisplaySettings";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setselectedDashboardPage } from "../../reducers/DisplaySettings";
import AddLayerAndSourceToMap from "../../maputils/AddSourceAndLayer";
import {
  settableColumn,
  settabledata,
} from "../../reducers/SupplierPlantation";
import makeRadiusfrompoint from "../../maputils/makeRadiusfrompoint";
import convertGeojsonToWKT from "../../maputils/convertGeojsonToWkt";
import { GeoJSONSource } from "maplibre-gl";

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

// @ts-ignore
const Popup = ({ properties, trace, map }: PopupProps) => {
  const [popup, setPopup] = useState(true);
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const propertyElements = properties
    ? Object.entries(properties).map(([key, value]) => (
        <div
          key={key}
          className="text-popupTxt max-w-[369px] text-[12px] leading-[14.63px] gap-2 flex h-[36.4px] items-center truncate"
        >
          <p
            style={{ textTransform: "capitalize" }}
            className=" w-[179px]  font-semibold  "
          >
            {key}
          </p>{" "}
          <div className="w-[190px]">{value}</div>
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
                dispatch(settabledata(res.data));

                axios
                  .get(
                    `${
                      import.meta.env.VITE_API_DASHBOARD_URL
                    }/table-column/agriplot/`
                  )
                  .then((res) => {
                    dispatch(settableColumn(res.data.columns));
                  });

                // window.location.replace(`/supplierplantation`);
                dispatch(setselectedDashboardPage("supplierplantation"));
                dispatch(setIsAgriplot(true));
                AddLayerAndSourceToMap({
                  map: map,
                  layerId: "actual-agriplot-registered-layer",
                  sourceId: "actual-agriplot-registered",
                  url: `${
                    import.meta.env.VITE_API_MAP_URL
                  }/function_zxy_query_app_agriplot_by_mill_eq_id/{z}/{x}/{y}?mill_eq_id=${
                    properties.mill_eq_id
                  }&status_of_plot=Registered
                  `,

                  source_layer: "function_zxy_query_app_agriplot_by_mill_eq_id",
                  showPopup: true,
                  style: {
                    fill_color: "green",
                    fill_opacity: "0",
                    stroke_color: "black",
                  },
                  image_path: "",
                  zoomToLayer: false,
                  center: [103.8574, 2.2739],
                  fillType: "fill",
                  trace: false,
                  component: "agriplot",
                });
                AddLayerAndSourceToMap({
                  map: map,
                  layerId: "actual-agriplot-unregistered-layer",
                  sourceId: "actual-agriplot-unregistered",
                  url: `${
                    import.meta.env.VITE_API_MAP_URL
                  }/function_zxy_query_app_agriplot_by_mill_eq_id/{z}/{x}/{y}?mill_eq_id=${
                    properties.mill_eq_id
                  }&status_of_plot=Unregistered
                  `,

                  source_layer: "function_zxy_query_app_agriplot_by_mill_eq_id",
                  showPopup: true,
                  style: {
                    fill_color: "#ffad33",
                    fill_opacity: "0",
                    stroke_color: "black",
                  },
                  image_path: "",
                  zoomToLayer: false,
                  center: [103.8574, 2.2739],
                  fillType: "fill",
                  trace: false,
                  component: "agriplot",
                });

                const radius = 50;
                const buffered = makeRadiusfrompoint(
                  [
                    parseFloat(properties.mill_long),
                    parseFloat(properties.mill_lat),
                  ],
                  radius * 1000
                );

                if (
                  map.getSource("polygon-radius") &&
                  map.getLayer("polygon-radius-layer")
                ) {
                  const source = map.getSource(
                    "polygon-radius"
                  ) as GeoJSONSource;
                  source.setData(buffered);

                  map.setLayoutProperty(
                    "polygon-radius-layer",
                    "visibility",
                    "visible"
                  );
                }
                const wkt_final = convertGeojsonToWKT(buffered);

                AddLayerAndSourceToMap({
                  map: map,
                  layerId: "potential-agriplot-registered-layer",
                  sourceId: "potential-agriplot-registered",
                  url: `${
                    import.meta.env.VITE_API_MAP_URL
                  }/function_zxy_query_app_agriplot_by_wkt_and_status/{z}/{x}/{y}?geometry_wkt=${wkt_final}&status_of_plot=Registered`,
                  source_layer:
                    "function_zxy_query_app_agriplot_by_wkt_and_status",
                  showPopup: true,
                  style: {
                    fill_color: "#ef38ff",
                    fill_opacity: "0",
                    stroke_color: "black",
                  },
                  image_path: "",
                  zoomToLayer: false,
                  center: [103.8574, 2.2739],
                  fillType: "fill",
                  trace: false,
                  component: "agriplot",
                });
                AddLayerAndSourceToMap({
                  map: map,
                  layerId: "potential-agriplot-unregistered-layer",
                  sourceId: "potential-agriplot-unregistered",
                  url: `${
                    import.meta.env.VITE_API_MAP_URL
                  }/function_zxy_query_app_agriplot_by_wkt_and_status/{z}/{x}/{y}?geometry_wkt=${wkt_final}&status_of_plot=Unregistered`,
                  source_layer:
                    "function_zxy_query_app_agriplot_by_wkt_and_status",
                  showPopup: true,
                  style: {
                    fill_color: "#ff3d00",
                    fill_opacity: "0",
                    stroke_color: "black",
                  },
                  image_path: "",
                  zoomToLayer: false,
                  center: [103.8574, 2.2739],
                  fillType: "fill",
                  trace: false,
                  component: "agriplot",
                });
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
      className={`flex-1 bg-white min-w-[389px] font-[Montserrat]  md:max-w-[389px] max-h-[353px] max-w-xs rounded-[10px] `}
    >
      <div className="flex flex-col relative items-center justify-between  p-3">
        <div className="flex items-center justify-between w-full ">
          <h1 className="font-normal hidden md:font-bold uppercase text-[9px] leading-[17.07px] md:text-[14px] mx-auto md:mx-0 md:block">
            information
          </h1>

          {trace ? (
            <button
              onClick={handleTraceplantation}
              className="border border-darkGreen w-[138px] h-[32px]  rounded-[5px] text-darkGreen font-semibold leading-[24px]  px-[10px] py-[4px] text-xs md:text-[7px] lg:text-[12px]"
            >
              <h1 className="w-[118px]">Trace to Plantation</h1>
            </button>
          ) : null}
        </div>
        <div
          onClick={() => setPopup(!popup)}
          className={`absolute w-[23.33px] transition-all  ${
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
            <div className="divide-y divide-boxDivider flex flex-col gap-[10px] mt-2">
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
