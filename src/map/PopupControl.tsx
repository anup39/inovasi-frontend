import { render } from "react-dom";
import { store } from "../store";
import { Provider } from "react-redux";
import Popup from "../components/commoncomp/Popup";
import { Map } from "maplibre-gl";

export default class PopupControl {
  private _map: Map | undefined;
  private _container: HTMLDivElement | null = null;
  private _properties: any = {}; // Update the type according to your properties structure
  private _trace: boolean = false;

  onAdd(map: Map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl";

    if (this._container) {
      this.renderPopup();
    }

    return this._container;
  }

  updatePopup(properties: any, trace: boolean) {
    this._properties = properties;
    this._trace = trace;

    this.renderPopup();
  }

  private renderPopup() {
    if (this._container) {
      render(
        <Provider store={store}>
          <Popup properties={this._properties} trace={this._trace} />
        </Provider>,
        this._container
      );
    }
  }

  onRemove() {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._map = undefined;
  }
}
