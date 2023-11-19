import Map from "../map/Map";
import { useRef } from "react";
import Search from "../components/mapcomp/Search";

export default function MapSection() {
  const searchRef = useRef(null);
  return (
    <div className="relative">
      <Map refObj={searchRef} />
      <div className="absolute top-10 right-20">
        <Search refObj={searchRef} />
      </div>
    </div>
  );
}
