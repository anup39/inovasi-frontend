import Routers from './routes/Routers';
import './App.css';
// import { MapProvider } from "react-map-gl/maplibre";

function App() {
  return (
    <div className='bg-gray-200'>
      {/* <MapProvider> */}
      <Routers />
      {/* </MapProvider> */}
    </div>
  );
}

export default App;
