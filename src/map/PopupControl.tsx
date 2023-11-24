import ReactDOM from "react-dom/client";
import { ReactNode } from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import Popup from "../components/commoncomp/Popup";
import { Map } from "maplibre-gl";

export default class PopupControl {
  private _map: Map | undefined;
  private _container: HTMLDivElement | null = null;
  private _properties!: {
    id: number;
    [key: string]: number | string;
  };
  private _trace: boolean = false;
  private _root: ReactNode;

  onAdd(map: Map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl";
    this._root = ReactDOM.createRoot(this._container);
    this._root.render(
      <Provider store={store}>
        <Popup properties={this._properties} trace={this._trace} />
      </Provider>
    );

    return this._container;
  }

  updatePopup(
    properties: { [key: string]: number | string; id: number },
    trace: boolean
  ) {
    this._properties = properties;
    this._trace = trace;

    if (this._root) {
      const updatedPopup = (
        <Provider store={store}>
          <Popup properties={this._properties} trace={this._trace} />
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
