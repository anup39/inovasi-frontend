import MapComp from "../map/Map";
import { useRef } from "react";
import Search from "../components/mapcomp/Search";
import { Map } from "maplibre-gl"; // Import 'Map' from 'maplibre-gl'

interface MapSectionProps {
  map: Map | null;
  onSetMap: (evmap: Map) => void;
}

const MapSection: React.FC<MapSectionProps> = ({ map, onSetMap }) => {
  const searchRef = useRef(null);
  return (
    <div className="relative">
      <MapComp refObj={searchRef} map={map} onSetMap={onSetMap} />
      <div className="absolute top-10 right-20">
        <Search refObj={searchRef} />
      </div>
    </div>
  );
};

export default MapSection;
