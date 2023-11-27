import ReactDOM from "react-dom/client";
import { store } from "../store";
import { Provider } from "react-redux";
import { Map } from "maplibre-gl";
import Buffer from "./Buffer";
export default class BufferControl {
  private _map: Map | undefined;
  private _container: HTMLDivElement | null = null;

  onAdd(map: Map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl ";
    ReactDOM.createRoot(this._container).render(
      <Provider store={store}>
        <Buffer map={this._map} />
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
