import ReactDOM, { Root } from "react-dom/client";
import { store } from "../store";
import { Provider } from "react-redux";
import Popup from "../components/commoncomp/Popup";
import { Map } from "maplibre-gl";

export default class PopupControl {
  // @ts-ignore
  private _map: Map | undefined;
  private _container: HTMLDivElement | null = null;
  private _properties!: {
    [key: string]: string | number;
    id: number;
    mill_name: string;
    mill_eq_id: string;
    mill_long: string;
    mill_lat: string;
  };
  private _trace: boolean = false;
  private _root: Root | undefined;
  private _open: boolean = false;

  onAdd(map: Map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl";
    this._root = ReactDOM.createRoot(this._container);
    this._root.render(
      <Provider store={store}>
        <Popup
          properties={this._properties}
          trace={this._trace}
          open={this._open}
        />
      </Provider>
    );

    return this._container;
  }

  updatePopup(
    properties: {
      [key: string]: string | number;
      id: number;
      mill_name: string;
      mill_eq_id: string;
      mill_long: string;
      mill_lat: string;
    },
    trace: boolean,
    open: boolean
  ) {
    this._properties = properties;
    this._trace = trace;
    this._open = open;

    if (this._root) {
      const updatedPopup = (
        <Provider store={store}>
          <Popup
            properties={this._properties}
            trace={this._trace}
            // @ts-ignore
            map={this._map}
            open={this._open}
          />
        </Provider>
      );
      this._root.render(updatedPopup);
    }
  }
  onRemove() {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._map = undefined;
  }
}
