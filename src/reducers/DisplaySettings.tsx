import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Template............

interface DisplaySettingsState {
  selectedDataFormat: string | null;
}

const initialState: DisplaySettingsState = {
  selectedDataFormat: "Supplier Mill",
};

export const DisplaySettings = createSlice({
  name: "DisplaySettings",
  initialState,

  reducers: {
    setselectedDataFormat: (state, action: PayloadAction<string | null>) => {
      state.selectedDataFormat = action.payload;
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const { setselectedDataFormat } = DisplaySettings.actions;

export default DisplaySettings.reducer;
