import ReactDOM, { Root } from "react-dom/client";
import { store } from "../store";
import { Provider } from "react-redux";
import Legend from "../components/commoncomp/Legend";
import { Map } from "maplibre-gl";

export default class LegendControl {
  // @ts-ignore
  private _map: Map | undefined;
  private _container: HTMLDivElement | null = null;

  private _root: Root | undefined;

  private _component: string | undefined;

  onAdd(map: Map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl";
    this._root = ReactDOM.createRoot(this._container);
    this._component = "dashboard";
    this._root.render(
      <Provider store={store}>
        <Legend component={this._component} map={this._map} />
      </Provider>
    );

    return this._container;
  }

  updateLegend(component: string) {
    this._component = component;
    if (this._root) {
      const updatedLegend = (
        <Provider store={store}>
          <Legend component={this._component} map={this._map} />
        </Provider>
      );
      this._root.render(updatedLegend);
    }
  }

  onRemove() {
    if (this._container && this._container.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._map = undefined;
  }
}
