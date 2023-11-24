import { render } from "react-dom";
import Dropdown from "../components/commoncomp/Dropdown";
import { store } from "../store";
import { Provider } from "react-redux";
import { Map } from "maplibre-gl";

const optionsReporting: string[] = ["Supplier Mill", "Metric"];

export default class SelectDataFormatControl {
  private _map: Map | undefined;
  private _container: HTMLDivElement | null = null;

  onAdd(map: Map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl";

    if (this._container) {
      this.renderReactComponent();
    }

    return this._container;
  }

  private renderReactComponent() {
    render(
      <Provider store={store}>
        <Dropdown options={optionsReporting} placeholder="Supplier Mill" />
      </Provider>,
      this._container
    );
  }

  onRemove() {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._map = undefined;
  }
}
