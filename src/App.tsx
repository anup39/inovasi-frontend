import Routers from "./routes/Routers";
import "./App.css";
import { useState } from "react";
import { Map } from "maplibre-gl"; // Import 'Map' from 'maplibre-gl'
import Toast from "./components/commoncomp/Toast";

function App() {
  const [map, setMap] = useState<Map | null>(null);

  const onSetMap = (evmap: Map) => {
    setMap(evmap);
  };

  return (
    <div>
      <Toast />
      <Routers map={map} onSetMap={onSetMap} />
    </div>
  );
}

export default App;
