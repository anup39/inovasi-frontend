import React, { useEffect, useState } from "react";
import AddLayerAndSourceToMap from "../../maputils/AddSourceAndLayer";
import { useDispatch } from "react-redux";
import { setpiechartfor } from "../../reducers/Auth";
import { Map } from "maplibre-gl";

interface DashBoxItemsProps {
  map: Map | null;
}

interface Item {
  id: number;
  name: string;
  total: number;
  selected: boolean;
  bgcolor: string;
  textColor: string;
  imagesrc: string;
}

const DashBoxItems: React.FC<DashBoxItemsProps> = ({ map }) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Facilities",
      total: 299,
      selected: true,
      bgcolor: "#018C79",
      textColor: "#04C684",
      imagesrc: "Facilities.svg",
    },
    {
      id: 2,
      name: "Refinery Supplier",
      total: 1034,
      selected: false,
      bgcolor: "#018C79",
      textColor: "#83DE60",
      imagesrc: "Refinery Supplier.svg",
    },
    {
      id: 3,
      name: "Mill Supplier",
      total: 2381,
      selected: false,
      bgcolor: "#018C79",
      textColor: "#B8E500",
      imagesrc: "Mill Supplier.svg",
    },
    // Other items...
  ]);

  useEffect(() => {
    if (map) {
      map.on("load", () => {
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
          zoomToLayer: true,
          center: [103.8574, 2.2739],
          geomType: "tile",
          fillType: "point",
          trace: false,
          component: "facilities",
        });
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
          zoomToLayer: true,
          center: [103.8574, 2.2739],
          geomType: "tile",
          fillType: "point",
          trace: false,
          component: "refinery",
        });
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
          zoomToLayer: true,
          center: [103.8574, 2.2739],
          geomType: "tile",
          fillType: "point",
          trace: false,
          component: "mill",
        });
      });
    }
  }, [map, dispatch]);

  const handleCurrentSelectedItem = (clickedItem: Item) => {
    const updatedItems = items.map((item) => {
      if (item.id === clickedItem.id) {
        if (item.name == "Facilities") {
          // if (map) {
          //   RemoveSourceAndLayerFromMap({
          //     map: map,
          //     layerId: "facility-layer",
          //     sourceId: "facility",
          //   });
          //   RemoveSourceAndLayerFromMap({
          //     map: map,
          //     layerId: "refinery-layer",
          //     sourceId: "refinery",
          //   });
          //   RemoveSourceAndLayerFromMap({
          //     map: map,
          //     layerId: "mill-layer",
          //     sourceId: "mill",
          //   });
          //   if (map.getSource("point") && map.getLayer("point-layer")) {
          //     map.setLayoutProperty("point-layer", "visibility", "none");
          //   }
          //   const popup_control: IControl =
          //     map._controls[map._controls.length - 1];

          //   // @ts-ignore
          //   popup_control.updatePopup({}, false);

          //   AddLayerAndSourceToMap({
          //     map: map,
          //     layerId: "facility-layer",
          //     sourceId: "facility",
          //     url: `${
          //       import.meta.env.VITE_API_MAP_URL
          //     }/app_facility/{z}/{x}/{y}`,
          //     source_layer: "app_facility",
          //     showPopup: true,
          //     style: {
          //       fill_color: "red",
          //       fill_opacity: "0",
          //       stroke_color: "",
          //     },
          //     image_path: "facilities.png",
          //     zoomToLayer: true,
          //     center: [103.8574, 2.2739],
          //     fillType: "point",
          //     trace: false,
          //     component: "facilities",
          //   });
          // }
          dispatch(setpiechartfor("facility"));
        }
        if (item.name == "Refinery Supplier") {
          // if (map) {
          //   RemoveSourceAndLayerFromMap({
          //     map: map,
          //     layerId: "facility-layer",
          //     sourceId: "facility",
          //   });
          //   RemoveSourceAndLayerFromMap({
          //     map: map,
          //     layerId: "refinery-layer",
          //     sourceId: "refinery",
          //   });
          //   RemoveSourceAndLayerFromMap({
          //     map: map,
          //     layerId: "mill-layer",
          //     sourceId: "mill",
          //   });
          //   if (map.getSource("point") && map.getLayer("point-layer")) {
          //     map.setLayoutProperty("point-layer", "visibility", "none");
          //   }
          //   const popup_control: IControl =
          //     map._controls[map._controls.length - 1];

          //   // @ts-ignore
          //   popup_control.updatePopup({}, false);

          //   AddLayerAndSourceToMap({
          //     map: map,
          //     layerId: "refinery-layer",
          //     sourceId: "refinery",
          //     url: `${
          //       import.meta.env.VITE_API_MAP_URL
          //     }/app_refinery/{z}/{x}/{y}`,
          //     source_layer: "app_refinery",
          //     showPopup: true,
          //     style: {
          //       fill_color: "green",
          //       fill_opacity: "0",
          //       stroke_color: "",
          //     },
          //     image_path: "refinery.png",
          //     zoomToLayer: true,
          //     center: [103.8574, 2.2739],
          //     fillType: "point",
          //     trace: false,
          //     component: "refinery",
          //   });
          // }
          dispatch(setpiechartfor("refinery"));
        }
        if (item.name == "Mill Supplier") {
          // if (map) {
          //   RemoveSourceAndLayerFromMap({
          //     map: map,
          //     layerId: "facility-layer",
          //     sourceId: "facility",
          //   });
          //   RemoveSourceAndLayerFromMap({
          //     map: map,
          //     layerId: "refinery-layer",
          //     sourceId: "refinery",
          //   });
          //   RemoveSourceAndLayerFromMap({
          //     map: map,
          //     layerId: "mill-layer",
          //     sourceId: "mill",
          //   });
          //   if (map.getSource("point") && map.getLayer("point-layer")) {
          //     map.setLayoutProperty("point-layer", "visibility", "none");
          //   }
          //   const popup_control: IControl =
          //     map._controls[map._controls.length - 1];

          //   // @ts-ignore
          //   popup_control.updatePopup({}, false);

          //   AddLayerAndSourceToMap({
          //     map: map,
          //     layerId: "mill-layer",
          //     sourceId: "mill",
          //     url: `${import.meta.env.VITE_API_MAP_URL}/app_mill/{z}/{x}/{y}`,
          //     source_layer: "app_mill",
          //     showPopup: true,
          //     style: {
          //       fill_color: "blue",
          //       fill_opacity: "0",
          //       stroke_color: "",
          //     },
          //     image_path: "millnew.png",
          //     zoomToLayer: true,
          //     center: [103.8574, 2.2739],
          //     fillType: "point",
          //     trace: false,
          //     component: "mill",
          //   });
          // }
          dispatch(setpiechartfor("mill"));
        }
        return { ...item, bgcolor: "#CCB848", selected: true };
      } else {
        return { ...item, bgcolor: "#018C79", selected: false };
      }
    });
    setItems(updatedItems);
  };

  return (
    <div className="flex items-center md:justify-center middle:justify-end md:w-full middle:w-1/2 gap-[10px] md:gap-[20px]  middle:gap-[24px]  xl:gap-[28px] xl:w-full">
      {items
        ? items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCurrentSelectedItem(item)}
              className={` transition-all ease-in-out rounded-[20px] bg-white xl:w-[237px] middle:h-[266px] w-1/3 md:h-[200px] md:max-w-[280px] min-h-[150px] min-w-[90px] ${
                item.selected ? `border-2 border-borderGreen ` : ``
              }  hover:cursor-pointer`}
            >
              {" "}
              <div className="h-full px-0 md:px-2 flex flex-col justify-between py-0 md:py-1">
                <div className="relative gap-1 flex flex-col md:flex-row items-start md:items-center ">
                  <img
                    className="scale-50 md:scale-75 "
                    src={item.imagesrc}
                    alt=""
                  />
                  <div className="flex pl-2 lg:pt-3 md:pl-0 w-full flex-col-reverse items-start md:flex-row gap-2 md:gap-3 md:items-center justify-between">
                    <p className=" text-semiBlackText font-medium md:font-semibold lg:font-bold text-xs xl:text-lg max-w-[80px]  ">
                      {item.name}
                    </p>
                    <img
                      className="absolute top-0.5 right-0.5 scale-75 md:scale-100"
                      src="moreinfo.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex pl-2 md:pl-0 flex-col gap-2 lg:pl-4 lg:pb-2 ">
                  <p
                    className="md:font-bold text-xs font-medium md:text-xl lg:text-2xl"
                    style={{ color: item.textColor }}
                    key={item.id}
                  >
                    {item.total}
                  </p>
                  <p className="text-xs ">{item.name}</p>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default DashBoxItems;
