import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Template............

interface PopupState {
  popup: object | null;
}

const initialState: PopupState = {
  popup: null,
};

export const Popup = createSlice({
  name: "Popup",
  initialState,
  reducers: {
    setpopup: (state, action: PayloadAction<object | null>) => {
      state.popup = action.payload;
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const { setpopup } = Popup.actions;

export default Popup.reducer;
