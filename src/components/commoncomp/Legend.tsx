import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import AddLayerAndSourceToMap from "../../maputils/AddSourceAndLayer";
import RemoveSourceAndLayerFromMap from "../../maputils/RemoveSourceAndLayer";
import { useDispatch, useSelector } from "react-redux";
import {
  addLayerName,
  removelayerName,
  setshowMapLoader,
} from "../../reducers/DisplaySettings";
import { RootState } from "../../store";

// @ts-ignore
export default function Lenged({ component, map }) {
  const dispatch = useDispatch();
  const [showLegend, setShowLegend] = useState(true);
  const [showMore, setShowMore] = useState(true);
  const layers_in_map = useSelector(
    (state: RootState) => state.displaySettings.layers_in_map
  );

  const current_mill_eq_id = useSelector(
    (state: RootState) => state.displaySettings.current_mill_eq_id
  );

  const current_radius_wkt = useSelector(
    (state: RootState) => state.displaySettings.current_radius_wkt
  );

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#42D272" : "#42D272",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  useEffect(() => {
    if (component === "dashboard") {
      setShowMore(false);
    }
    if (component === "millsupplier") {
      setShowMore(false);
    }
    if (component === "supplierplantation") {
      setShowMore(true);
    }
  }, [component]);

  // @ts-ignore
  const handleLayerChecked = (event, layer) => {
    // @ts-ignore
    if (event.target.checked) {
      if (layer === "Facilities") {
        if (map) {
          if (map.getSource("point") && map.getLayer("point-layer")) {
            map.setLayoutProperty("point-layer", "visibility", "none");
          }
          dispatch(addLayerName("Facilities"));
          AddLayerAndSourceToMap({
            map: map,
            layerId: "facility-layer",
            sourceId: "facility",
            url: `${import.meta.env.VITE_API_MAP_URL}/app_facility/{z}/{x}/{y}`,
            source_layer: "app_facility",
            showPopup: true,
            style: {
              fill_color: "red",
              fill_opacity: "0",
              stroke_color: "",
            },
            image_path: "facilities.png",
            zoomToLayer: false,
            center: [103.8574, 2.2739],
            geomType: "tile",
            fillType: "point",
            trace: false,
            component: "facilities",
          });
        }
      }
      if (layer === "Refinery Supplier") {
        if (map) {
          if (map.getSource("point") && map.getLayer("point-layer")) {
            map.setLayoutProperty("point-layer", "visibility", "none");
          }
          dispatch(addLayerName("Refinery Supplier"));
          AddLayerAndSourceToMap({
            map: map,
            layerId: "refinery-layer",
            sourceId: "refinery",
            url: `${import.meta.env.VITE_API_MAP_URL}/app_refinery/{z}/{x}/{y}`,
            source_layer: "app_refinery",
            showPopup: true,
            style: {
              fill_color: "green",
              fill_opacity: "0",
              stroke_color: "",
            },
            image_path: "refinery.png",
            zoomToLayer: false,
            center: [103.8574, 2.2739],
            geomType: "tile",
            fillType: "point",
            trace: false,
            component: "refinery",
          });
        }
      }
      if (layer === "Mill Supplier") {
        if (map) {
          if (map.getSource("point") && map.getLayer("point-layer")) {
            map.setLayoutProperty("point-layer", "visibility", "none");
          }
          dispatch(addLayerName("Mill Supplier"));
          AddLayerAndSourceToMap({
            map: map,
            layerId: "mill-layer",
            sourceId: "mill",
            url: `${
              import.meta.env.VITE_API_MAP_URL
            }/function_zxy_query_app_mill_by_unplanted/{z}/{x}/{y}`,
            source_layer: "function_zxy_query_app_mill_by_unplanted",
            showPopup: true,
            style: {
              fill_color: "blue",
              fill_opacity: "0",
              stroke_color: "",
            },
            image_path: "millnew.png",
            zoomToLayer: false,
            center: [103.8574, 2.2739],
            geomType: "tile",
            fillType: "point",
            trace: true,
            component: "mill",
          });
        }
      }
      if (layer === "Traced to Plantation Mill") {
        if (map) {
          if (map.getSource("point") && map.getLayer("point-layer")) {
            map.setLayoutProperty("point-layer", "visibility", "none");
          }
          dispatch(addLayerName("Traced to Plantation Mill"));
          AddLayerAndSourceToMap({
            map: map,
            layerId: "mill-layer-planted",
            sourceId: "mill-planted",
            url: `${
              import.meta.env.VITE_API_MAP_URL
            }/function_zxy_query_app_mill_by_planted/{z}/{x}/{y}`,
            source_layer: "function_zxy_query_app_mill_by_planted",
            showPopup: true,
            style: {
              fill_color: "blue",
              fill_opacity: "0",
              stroke_color: "",
            },
            image_path: "planted.png",
            zoomToLayer: false,
            center: [103.8574, 2.2739],
            geomType: "tile",
            fillType: "point",
            trace: true,
            component: "mill",
          });
        }
      }
      if (layer === "Actual registered supplier") {
        if (map) {
          if (map.getSource("point") && map.getLayer("point-layer")) {
            map.setLayoutProperty("point-layer", "visibility", "none");
          }
          // if (
          //   map.getSource("polygon-table") &&
          //   map.getLayer("polygon-table-layer")
          // ) {
          //   map.setLayoutProperty("polygon-table-layer", "visibility", "none");
          // }
          dispatch(addLayerName("Actual registered supplier"));
          AddLayerAndSourceToMap({
            map: map,
            layerId: "actual-agriplot-registered-layer",
            sourceId: "actual-agriplot-registered",
            url: `${
              import.meta.env.VITE_API_DASHBOARD_URL
            }/agriplot-geojson/?status=Registered&mill_eq_id=${current_mill_eq_id}`,
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
          dispatch(setshowMapLoader(true));
          setTimeout(() => {
            dispatch(setshowMapLoader(false));
          }, 3000);
        }
      }
      if (layer === "Actual unregistered supplier") {
        if (map) {
          if (map.getSource("point") && map.getLayer("point-layer")) {
            map.setLayoutProperty("point-layer", "visibility", "none");
          }
          dispatch(addLayerName("Actual unregistered supplier"));
          AddLayerAndSourceToMap({
            map: map,
            layerId: "actual-agriplot-unregistered-layer",
            sourceId: "actual-agriplot-unregistered",
            url: `${
              import.meta.env.VITE_API_DASHBOARD_URL
            }/agriplot-geojson/?status=Unregistered&mill_eq_id=${current_mill_eq_id}`,
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
          dispatch(setshowMapLoader(true));
          setTimeout(() => {
            dispatch(setshowMapLoader(false));
          }, 2000);
        }
      }
      if (layer === "Potential registered supplier") {
        if (map) {
          if (map.getSource("point") && map.getLayer("point-layer")) {
            map.setLayoutProperty("point-layer", "visibility", "none");
          }
          dispatch(addLayerName("Potential registered supplier"));
          const mill_long = localStorage.getItem("mill_long");
          const mill_lat = localStorage.getItem("mill_lat");
          const mill_point = `POINT (${parseFloat(mill_long)} ${parseFloat(
            mill_lat
          )})`;

          AddLayerAndSourceToMap({
            map: map,
            layerId: "potential-agriplot-registered-layer",
            sourceId: "potential-agriplot-registered",
            // url: `${
            //   import.meta.env.VITE_API_DASHBOARD_URL
            // }/agriplot-geojson-wkt/?status=Registered&radius=${String(
            //   radius
            // )}&mill_eq_id=${properties.mill_eq_id}`,
            url: `${
              import.meta.env.VITE_API_MAP_URL
            }/function_zxy_query_test_agriplot_by_radius_and_status/{z}/{x}/{y}?status=Registered&radius=${String(
              current_radius_wkt
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
            fillType: "geojson",
            trace: false,
            component: "agriplot",
          });

          dispatch(setshowMapLoader(true));
          setTimeout(() => {
            dispatch(setshowMapLoader(false));
          }, 10000);
        }
      }
      if (layer === "Potential unregistered supplier") {
        if (map) {
          if (map.getSource("point") && map.getLayer("point-layer")) {
            map.setLayoutProperty("point-layer", "visibility", "none");
          }
          dispatch(addLayerName("Potential unregistered supplier"));
          const mill_long = localStorage.getItem("mill_long");
          const mill_lat = localStorage.getItem("mill_lat");
          const mill_point = `POINT (${parseFloat(mill_long)} ${parseFloat(
            mill_lat
          )})`;

          AddLayerAndSourceToMap({
            map: map,
            layerId: "potential-agriplot-unregistered-layer",
            sourceId: "potential-agriplot-unregistered",
            url: `${
              import.meta.env.VITE_API_MAP_URL
            }/function_zxy_query_test_agriplot_by_radius_and_status/{z}/{x}/{y}?status=Unregistered&radius=${String(
              current_radius_wkt
            )}&mill_point=${mill_point}`,
            source_layer:
              "function_zxy_query_test_agriplot_by_radius_and_status",
            showPopup: true,
            style: {
              fill_color: "red",
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

          dispatch(setshowMapLoader(true));
          setTimeout(() => {
            dispatch(setshowMapLoader(false));
          }, 10000);
        }
      }
    } else {
      // map.setLayoutProperty(`${layer}_layer`, "visibility", "none");
      if (layer == "Facilities") {
        RemoveSourceAndLayerFromMap({
          map: map,
          layerId: "facility-layer",
          sourceId: "facility",
        });
        dispatch(removelayerName("Facilities"));
      }
      if (layer == "Refinery Supplier") {
        RemoveSourceAndLayerFromMap({
          map: map,
          layerId: "refinery-layer",
          sourceId: "refinery",
        });
        dispatch(removelayerName("Refinery Supplier"));
      }
      if (layer == "Mill Supplier") {
        RemoveSourceAndLayerFromMap({
          map: map,
          layerId: "mill-layer",
          sourceId: "mill",
        });
        dispatch(removelayerName("Mill Supplier"));
      }
      if (layer == "Traced to Plantation Mill") {
        RemoveSourceAndLayerFromMap({
          map: map,
          layerId: "mill-layer-planted",
          sourceId: "mill-planted",
        });
        dispatch(removelayerName("Traced to Plantation Mill"));
      }
      if (layer == "Actual registered supplier") {
        // if (
        //   map.getSource("polygon-table") &&
        //   map.getLayer("polygon-table-layer")
        // ) {
        //   map.setLayoutProperty("polygon-table-layer", "visibility", "none");
        // }
        RemoveSourceAndLayerFromMap({
          map: map,
          layerId: "actual-agriplot-registered-layer",
          sourceId: "actual-agriplot-registered",
        });
        dispatch(removelayerName("Actual registered supplier"));
      }
      if (layer == "Actual unregistered supplier") {
        RemoveSourceAndLayerFromMap({
          map: map,
          layerId: "actual-agriplot-unregistered-layer",
          sourceId: "actual-agriplot-unregistered",
        });
        dispatch(removelayerName("Actual unregistered supplier"));
      }
      if (layer == "Potential registered supplier") {
        RemoveSourceAndLayerFromMap({
          map: map,
          layerId: "potential-agriplot-registered-layer",
          sourceId: "potential-agriplot-registered",
        });
        dispatch(removelayerName("Potential registered supplier"));
      }
      if (layer == "Potential unregistered supplier") {
        RemoveSourceAndLayerFromMap({
          map: map,
          layerId: "potential-agriplot-unregistered-layer",
          sourceId: "potential-agriplot-unregistered",
        });
        dispatch(removelayerName("Potential unregistered supplier"));
      }
    }
  };
  return (
    <div>
      <div
        onClick={() => setShowLegend(!showLegend)}
        className="scale-75 md:scale-100 absolute flex justify-center items-center bg-opacity-90 font-bold text-lg px-3 cursor-pointer aspect-square rounded-lg text-darkGreen border border-darkGreen bg-white top-1 md:top-2 left-0 md:left-2 "
      >
        i
      </div>
      {/* legend div */}
      <div
        className={`shadow p-3 -top-5 scale-[0.6] md:scale-100 transition-all ease-in-out delay-100 ${
          showLegend ? "flex" : "hidden"
        } rounded-[10px] flex-col gap-[17px] bg-white absolute z-20 md:top-2 -left-16 md:left-10 ${
          showMore ? "h-[300px] md:h-[350px] -top-5" : "h-[200px] top-2"
        } w-[310px] sm:w-[356px]`}
      >
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">Legend</h1>
          {showMore ? (
            <p
              style={{
                display: component === "supplierplantation" ? "block" : "none",
              }}
              onClick={() => setShowMore(false)}
              className={`underline cursor-pointer text-darkGreen`}
            >
              See less
            </p>
          ) : (
            <p
              style={{
                display: component === "supplierplantation" ? "block" : "none",
              }}
              onClick={() => setShowMore(true)}
              className={`underline cursor-pointer text-darkGreen`}
            >
              See more
            </p>
          )}
        </div>

        <div className="h-[1px] items-center justify-start bg-legendDivider"></div>
        <div
          style={{ display: component === "dashboard" ? "flex" : "none" }}
          className="flex justify-between items-center"
        >
          <div className="flex gap-3">
            <img src="facilitieslegend.svg" alt="" />
            <p className="text-homeSubText">Facilities</p>
          </div>
          <AntSwitch
            onClick={(event) => handleLayerChecked(event, "Facilities")}
            defaultChecked={layers_in_map.includes("Facilities")}
          />
        </div>
        <div
          style={{ display: component === "dashboard" ? "flex" : "none" }}
          className="flex justify-between items-center"
        >
          <div className="flex gap-3">
            <img src="refinerylegend.svg" alt="" />
            <p className="text-homeSubText">Refinery</p>
          </div>
          <AntSwitch
            onClick={(event) => handleLayerChecked(event, "Refinery Supplier")}
            defaultChecked={layers_in_map.includes("Refinery Supplier")}
          />
        </div>
        <div
          style={{
            display:
              component === "dashboard" ||
              component === "millsupplier" ||
              component === "supplierplantation"
                ? "flex"
                : "none",
          }}
          className="flex justify-between items-center"
        >
          <div className="flex gap-3">
            <img src="milllegend.svg" alt="" />
            <p className="text-homeSubText">Mill</p>
          </div>
          <AntSwitch
            onClick={(event) => handleLayerChecked(event, "Mill Supplier")}
            defaultChecked={layers_in_map.includes("Mill Supplier")}
          />
        </div>
        <div
          style={{
            display:
              component === "millsupplier" || component === "supplierplantation"
                ? "flex"
                : "none",
          }}
          className="flex justify-between items-center"
        >
          <div className="flex gap-3">
            <img src="plantationlegend.svg" alt="" />
            <p className="text-homeSubText">Traced to Plantation Mill</p>
          </div>
          <AntSwitch
            onClick={(event) =>
              handleLayerChecked(event, "Traced to Plantation Mill")
            }
            defaultChecked={layers_in_map.includes("Traced to Plantation Mill")}
          />
        </div>
        {/* div that appears after see all */}
        {showMore ? (
          <div className="overflow-y-scroll flex gap-[17px] flex-col">
            <div className="h-[1px] items-center justify-start bg-legendDivider"></div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="h-4 aspect-square bg-footerHeading"></div>
                <p className="">Actual registered supplier</p>
              </div>
              <AntSwitch
                onClick={(event) =>
                  handleLayerChecked(event, "Actual registered supplier")
                }
                defaultChecked={layers_in_map.includes(
                  "Actual registered supplier"
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="h-4 aspect-square bg-[#FFAD33]"></div>
                <p className="">Actual unregistered supplier</p>
              </div>
              <AntSwitch
                onClick={(event) =>
                  handleLayerChecked(event, "Actual unregistered supplier")
                }
                defaultChecked={layers_in_map.includes(
                  "Actual unregistered supplier"
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="h-4 aspect-square bg-[#EF38FF]"></div>
                <p>Potential registered supplier</p>
              </div>
              <AntSwitch
                onClick={(event) =>
                  handleLayerChecked(event, "Potential registered supplier")
                }
                defaultChecked={layers_in_map.includes(
                  "Potential registered supplier"
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="h-4 aspect-square bg-potentialUnSupp"></div>
                <p>Potential unregistered supplier</p>
              </div>
              <AntSwitch
                onClick={(event) =>
                  handleLayerChecked(event, "Potential unregistered supplier")
                }
                defaultChecked={layers_in_map.includes(
                  "Potential unregistered supplier"
                )}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
