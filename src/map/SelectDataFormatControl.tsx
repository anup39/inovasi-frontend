import ReactDOM from "react-dom/client";
import Dropdown from "../components/commoncomp/Dropdown";
import { store } from "../store";
import { Provider } from "react-redux";
import { Map } from "maplibre-gl";

const optionsReporting = ["Table", "Metric"];
export default class SelectDataFormatControl {
  // @ts-ignore
  private _map: Map | undefined;
  private _container: HTMLDivElement | null = null;

  onAdd(map: Map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl ";
    ReactDOM.createRoot(this._container).render(
      <Provider store={store}>
        <Dropdown options={optionsReporting} placeholder="Table" />
      </Provider>
    );
    return this._container;
  }

  onRemove() {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._map = undefined;
  }
}
