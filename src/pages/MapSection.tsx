import MapComp from "../map/Map";
import { useRef } from "react";
import Search from "../components/mapcomp/Search";
import { Map } from "maplibre-gl"; // Import 'Map' from 'maplibre-gl'
import Toast from "../components/commoncomp/Toast";

interface MapSectionProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
  component: string;
}

const MapSection: React.FC<MapSectionProps> = ({
  map,
  onSetMap,
  component,
}) => {
  const searchRef = useRef(null);
  return (
    <div className="relative h-full">
      <MapComp
        refObj={searchRef}
        map={map}
        onSetMap={onSetMap}
        component={component}
      />
      <Toast />
      <div className="absolute top-10 right-20">
        <Search refObj={searchRef} />
      </div>
    </div>
  );
};

export default MapSection;
