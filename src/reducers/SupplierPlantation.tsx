import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SupplierPlantationState {
  estateids: [] | null;
}

const initialState: SupplierPlantationState = {
  estateids: [],
};

export const SupplierPlantation = createSlice({
  name: "SupplierPlantation",
  initialState,
  reducers: {
    setestateids: (state, action: PayloadAction<[] | null>) => {
      state.estateids = action.payload;
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const { setestateids } = SupplierPlantation.actions;

export default SupplierPlantation.reducer;
