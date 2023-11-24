import React, { useEffect, useState } from "react";
import AddLayerAndSourceToMap from "../../maputils/AddSourceAndLayer";
import RemoveSourceAndLayerFromMap from "../../maputils/RemoveSourceAndLayer";
import { useDispatch } from "react-redux";
import { setpiechartfor } from "../../reducers/Auth";
import { Map } from "maplibre-gl"; // Import 'Map' from 'maplibre-gl'

interface DashBoxItemsProps {
  map: Map | null;
}

interface Item {
  id: number;
  name: string;
  total: number;
  selected: boolean;
  bgcolor: string;
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
      imagesrc: "Facilities.svg",
    },
    {
      id: 2,
      name: "Refinery Supplier",
      total: 1034,
      selected: false,
      bgcolor: "#018C79",
      imagesrc: "Refinery Supplier.svg",
    },
    {
      id: 3,
      name: "Mill Supplier",
      total: 2381,
      selected: false,
      bgcolor: "#018C79",
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
            fill_opacity: 0,
            stroke_color: "",
          },
          zoomToLayer: true,
          center: [103.8574, 2.2739],
          fillType: "point",
          trace: false,
        });
      });
    }
  }, [map]);

  const handleCurrentSelectedItem = (clickedItem: Item) => {
    const updatedItems = items.map((item) => {
      if (item.id === clickedItem.id) {
        if (item.name == "Facilities") {
          if (map) {
            RemoveSourceAndLayerFromMap(map, "facility-layer", "facility");
            AddLayerAndSourceToMap({
              map: map,
              layerId: "facility-layer",
              sourceId: "facility",
              url: `${
                import.meta.env.VITE_API_MAP_URL
              }/app_facility/{z}/{x}/{y}`,
              source_layer: "app_facility",
              showPopup: true,
              style: {
                fill_color: "red",
                fill_opacity: 0,
                stroke_color: "",
              },
              zoomToLayer: true,
              center: [103.8574, 2.2739],
              fillType: "point",
              trace: false,
            });
          }
          dispatch(setpiechartfor("facility"));
        }
        if (item.name == "Refinery Supplier") {
          if (map) {
            RemoveSourceAndLayerFromMap(map, "refinery-layer", "refinery");
            AddLayerAndSourceToMap({
              map: map,
              layerId: "refinery-layer",
              sourceId: "refinery",
              url: `${
                import.meta.env.VITE_API_MAP_URL
              }/app_refinery/{z}/{x}/{y}`,
              source_layer: "app_refinery",
              showPopup: true,
              style: {
                fill_color: "green",
                fill_opacity: 0,
                stroke_color: "",
              },
              zoomToLayer: true,
              center: [103.8574, 2.2739],
              fillType: "point",
              trace: false,
            });
          }
          dispatch(setpiechartfor("refinery"));
        }
        if (item.name == "Mill Supplier") {
          if (map) {
            RemoveSourceAndLayerFromMap(map, "mill-layer", "mill");
            AddLayerAndSourceToMap({
              map: map,
              layerId: "mill-layer",
              sourceId: "mill",
              url: `${import.meta.env.VITE_API_MAP_URL}/app_mill/{z}/{x}/{y}`,
              source_layer: "app_mill",
              showPopup: true,
              style: {
                fill_color: "blue",
                fill_opacity: 0,
                stroke_color: "",
              },
              zoomToLayer: true,
              center: [103.8574, 2.2739],
              fillType: "point",
              trace: false,
            });
          }
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
    <div className="flex items-center gap-3">
      {items
        ? items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCurrentSelectedItem(item)}
              className={`rounded-md min-w-[110px] md:min-w-[150px] lg:min-w-[160px] h-[160px] lg:h-[190px] lg:aspect-square ${
                item.selected ? "bg-[#CCB848]" : `bg-[${item.bgcolor}]`
                // item.selected ? 'bg-[#CCB848]' : `bg-[#018C79]`
              } dashItems hover:cursor-pointer`}
            >
              <div className="@apply px-4 flex flex-col items-start gap-4 py-5 ">
                <img src={item.imagesrc} alt="" />
                <p className=" text-white">{item.name}</p>
                <p className="font-bold text-white">{item.total}</p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default DashBoxItems;
