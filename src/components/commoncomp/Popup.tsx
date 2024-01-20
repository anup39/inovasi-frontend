import axios from "axios";
import {
  settoastType,
  settoastMessage,
  setshowToast,
  setIsAgriplot,
  addLayerName,
  setCurrentRadiusWkt,
  setCurrentMillEqId,
  setMillCoordinates,
  setshowMapLoader,
} from "../../reducers/DisplaySettings";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setselectedDashboardPage } from "../../reducers/DisplaySettings";
import AddLayerAndSourceToMap from "../../maputils/AddSourceAndLayer";
import {
  settableColumn,
  settabledata,
  settabledataPotential,
} from "../../reducers/SupplierPlantation";
import makeRadiusfrompoint from "../../maputils/makeRadiusfrompoint";
import convertGeojsonToWKT from "../../maputils/convertGeojsonToWkt";
import { GeoJSONSource } from "maplibre-gl";
import { IControl } from "maplibre-gl";
import { setpiechartfor } from "../../reducers/Auth";

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
  const [popup, setPopup] = useState(false);
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
          const radius = 50;
          const { buffered, extent } = makeRadiusfrompoint(
            [parseFloat(properties.mill_long), parseFloat(properties.mill_lat)],
            radius * 1000
          );

          if (
            map.getSource("polygon-radius") &&
            map.getLayer("polygon-radius-layer")
          ) {
            const source = map.getSource("polygon-radius") as GeoJSONSource;
            source.setData(buffered);

            map.setLayoutProperty(
              "polygon-radius-layer",
              "visibility",
              "visible"
            );
            map.fitBounds(extent);
          }
          const wkt_final = convertGeojsonToWKT(buffered);
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
                // fetch potential registered for table
                axios
                  .get(
                    `${
                      import.meta.env.VITE_API_DASHBOARD_URL
                    }/agriplot-result-wkt/?mill_eq_id=${
                      properties.mill_eq_id
                    }&geometry_wkt=${wkt_final}`
                  )
                  .then((res) => {
                    dispatch(settabledataPotential(res.data));
                  });

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

                const legend_control: IControl =
                  map._controls[map._controls.length - 2];

                // @ts-ignore
                legend_control.updateLegend("supplierplantation");

                dispatch(setIsAgriplot(true));
                dispatch(
                  setMillCoordinates([
                    parseFloat(properties.mill_long),
                    parseFloat(properties.mill_lat),
                  ])
                );
                dispatch(setCurrentRadiusWkt(wkt_final));
                dispatch(setCurrentMillEqId(properties.mill_eq_id));

                const mill_point = `POINT (${parseFloat(
                  properties.mill_long
                )} ${parseFloat(properties.mill_lat)})`;

                const latRadians =
                  (parseFloat(properties.mill_lat) * 3.14) / 180;
                // 1 longitudinal degree at the equator equals 111,319.5m equivalent to 111.32km
                const radius = 50000 / (111319.5 * Math.cos(latRadians));

                AddLayerAndSourceToMap({
                  map: map,
                  layerId: "potential-agriplot-registered-layer",
                  sourceId: "potential-agriplot-registered",
                  // url: `${
                  //   import.meta.env.VITE_API_DASHBOARD_URL
                  // }/agriplot-geojson-wkt/?status=Registered&geometry_wkt=${wkt_final}&mill_eq_id=${
                  //   properties.mill_eq_id
                  // }`,
                  url: `${
                    import.meta.env.VITE_API_MAP_URL
                  }/function_zxy_query_test_agriplot_by_radius_and_status/{z}/{x}/{y}?status=Registered&radius=${String(
                    radius
                  )}&mill_point=${mill_point}`,
                  // source_layer: "potential-agriplot-registered-layer",
                  source_layer:
                    "function_zxy_query_test_agriplot_by_radius_and_status",
                  showPopup: true,
                  style: {
                    fill_color: "#ef38ff",
                    fill_opacity: "0",
                    stroke_color: "black",
                  },
                  image_path: "",
                  zoomToLayer: false,
                  center: [103.8574, 2.2739],
                  geomType: "tile",
                  fillType: "fill",
                  trace: false,
                  component: "agriplot",
                });
                AddLayerAndSourceToMap({
                  map: map,
                  layerId: "potential-agriplot-unregistered-layer",
                  sourceId: "potential-agriplot-unregistered",
                  url: `${
                    import.meta.env.VITE_API_DASHBOARD_URL
                  }/agriplot-geojson-wkt/?status=Unregistered&geometry_wkt=${wkt_final}&mill_eq_id=${
                    properties.mill_eq_id
                  }`,
                  source_layer: "potential-agriplot-unregistered-layer",
                  showPopup: true,
                  style: {
                    fill_color: "red",
                    fill_opacity: "0",
                    stroke_color: "black",
                  },
                  image_path: "",
                  zoomToLayer: false,
                  center: [103.8574, 2.2739],
                  geomType: "geojson",
                  fillType: "fill",
                  trace: false,
                  component: "agriplot",
                });

                AddLayerAndSourceToMap({
                  map: map,
                  layerId: "actual-agriplot-unregistered-layer",
                  sourceId: "actual-agriplot-unregistered",
                  url: `${
                    import.meta.env.VITE_API_DASHBOARD_URL
                  }/agriplot-geojson/?status=Unregistered&mill_eq_id=${
                    properties.mill_eq_id
                  }`,
                  source_layer: "actual-agriplot-unregistered-layer",
                  showPopup: true,
                  style: {
                    fill_color: "#ffad33",
                    fill_opacity: "0",
                    stroke_color: "black",
                  },
                  image_path: "",
                  zoomToLayer: false,
                  center: [103.8574, 2.2739],
                  geomType: "geojson",
                  fillType: "fill",
                  trace: false,
                  component: "agriplot",
                });

                AddLayerAndSourceToMap({
                  map: map,
                  layerId: "actual-agriplot-registered-layer",
                  sourceId: "actual-agriplot-registered",
                  url: `${
                    import.meta.env.VITE_API_DASHBOARD_URL
                  }/agriplot-geojson/?status=Registered&mill_eq_id=${
                    properties.mill_eq_id
                  }`,
                  source_layer: "actual-agriplot-registered-layer",
                  showPopup: true,
                  style: {
                    fill_color: "green",
                    fill_opacity: "0",
                    stroke_color: "black",
                  },
                  image_path: "",
                  zoomToLayer: false,
                  center: [103.8574, 2.2739],
                  geomType: "geojson",
                  fillType: "fill",
                  trace: false,
                  component: "agriplot",
                });
                dispatch(addLayerName("Actual registered supplier"));
                dispatch(addLayerName("Actual unregistered supplier"));
                dispatch(addLayerName("Potential registered supplier"));
                dispatch(addLayerName("Potential unregistered supplier"));
                dispatch(setpiechartfor("agriplot"));
                dispatch(setshowMapLoader(true));
                setTimeout(() => {
                  dispatch(setshowMapLoader(false));
                }, 10000);
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
      className={`flex-1 bg-white w-[270px] sm:w-[310px] md:min-w-[389px] font-[Montserrat] ${
        popup ? "h-[270px] lg:h-[333px]" : "h-[52px]"
      } max-w-xs rounded-[10px] `}
    >
      <div className="flex flex-col relative items-center justify-between  p-3">
        <div className="flex items-center justify-center md:justify-between w-full ">
          <h1 className="font-normal hidden md:font-bold uppercase text-[9px] leading-[17.07px] md:text-[14px]  md:block">
            information
          </h1>

          {trace ? (
            <button
              onClick={handleTraceplantation}
              className="border border-darkGreen w-[138px] h-[32px]  rounded-[5px] text-darkGreen font-semibold leading-[24px]  px-[10px] py-[4px] text-xs md:text-[10px] lg:text-[12px]"
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
            className={`bg-white rounded w-full  p-2 overflow-scroll overflow-y-scroll ${
              popup ? "block h-[230px] lg:h-[271px]" : "hidden"
            } `}
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
