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
}

const initialState: DisplaySettingsState = {
  selectedDataFormat: "Table",
  showToast: false,
  toastMessage: "Click on point to see the data",
  toastType: "info",
  selectedDashboardPage: "dashboard",
  is_agriplot: false,
  layers_in_map: [],
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
} = DisplaySettings.actions;

export default DisplaySettings.reducer;
