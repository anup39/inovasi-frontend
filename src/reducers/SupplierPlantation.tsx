import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SupplierPlantationState {
  estateids: [] | null;
  tabledata: [] | null;
}

const initialState: SupplierPlantationState = {
  estateids: [],
  tabledata: [],
};

export const SupplierPlantation = createSlice({
  name: "SupplierPlantation",
  initialState,
  reducers: {
    setestateids: (state, action: PayloadAction<[] | null>) => {
      state.estateids = action.payload;
    },
    settabledata: (state, action: PayloadAction<[] | null>) => {
      state.tabledata = action.payload;
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const { setestateids, settabledata } = SupplierPlantation.actions;

export default SupplierPlantation.reducer;
