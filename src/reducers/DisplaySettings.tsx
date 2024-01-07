import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Template............

interface DisplaySettingsState {
  selectedDataFormat: string | null;
  showToast: boolean;
  toastMessage: string;
  toastType: string;
  selectedDashboardPage: string;
  is_agriplot: boolean;
  layers_in_map: string[];
  current_mill_eq_id: string | null;
  current_radius_wkt: string | null;
}

const initialState: DisplaySettingsState = {
  selectedDataFormat: "Table",
  showToast: false,
  toastMessage: "Click on point to see the data",
  toastType: "info",
  selectedDashboardPage: "dashboard",
  is_agriplot: false,
  layers_in_map: [
    "Facilities",
    "Refinery Supplier",
    "Mill Supplier",
    "Traced to Plantation Mill",
  ],
  current_mill_eq_id: null,
  current_radius_wkt: null,
};

export const DisplaySettings = createSlice({
  name: "DisplaySettings",
  initialState,

  reducers: {
    setshowToast: (state, action) => {
      state.showToast = action.payload;
    },
    settoastMessage: (state, action) => {
      state.toastMessage = action.payload;
    },
    settoastType: (state, action) => {
      state.toastType = action.payload;
    },
    setselectedDataFormat: (state, action: PayloadAction<string | null>) => {
      state.selectedDataFormat = action.payload;
    },
    setselectedDashboardPage: (state, action: PayloadAction<string>) => {
      state.selectedDashboardPage = action.payload;
    },
    setIsAgriplot: (state, action: PayloadAction<boolean>) => {
      state.is_agriplot = action.payload;
    },
    addLayerName: (state, action) => {
      const newLayer = action.payload;
      if (!state.layers_in_map.includes(newLayer)) {
        state.layers_in_map.push(newLayer);
      }
    },
    removelayerName: (state, action) => {
      const layerToRemove = action.payload;
      state.layers_in_map = state.layers_in_map.filter(
        (name) => name !== layerToRemove
      );
    },
    setCurrentMillEqId: (state, action: PayloadAction<string>) => {
      state.current_mill_eq_id = action.payload;
    },
    setCurrentRadiusWkt: (state, action: PayloadAction<string>) => {
      state.current_radius_wkt = action.payload;
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  setshowToast,
  settoastMessage,
  settoastType,
  setselectedDataFormat,
  setselectedDashboardPage,
  setIsAgriplot,
  addLayerName,
  removelayerName,
  setCurrentMillEqId,
  setCurrentRadiusWkt,
} = DisplaySettings.actions;

export default DisplaySettings.reducer;
