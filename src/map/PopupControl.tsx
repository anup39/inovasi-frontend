import ReactDOM from "react-dom/client";
import { store } from "../store";
import { Provider } from "react-redux";
import Popup from "./Popup";

export default class PopupControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl ";
    this._properties = {};
    this._trace = false;
    this._root = ReactDOM.createRoot(this._container);
    this._root.render(
      <Provider store={store}>
        <Popup properties={this._properties} trace={this._trace} />
      </Provider>
    );

    return this._container;
  }

  updatepopup(properties, trace) {
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
