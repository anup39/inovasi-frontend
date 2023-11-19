import Map from "../map/Map";
import { useRef } from "react";
import Search from "../components/mapcomp/Search";

export default function MapSection() {
  const searchRef = useRef(null);
  return (
    <div>
      <Map refObj={searchRef} />
      <div style={{ position: "absolute", top: "5vh", right: "5vw" }}>
        <Search refObj={searchRef} />
      </div>
    </div>
  );
}
