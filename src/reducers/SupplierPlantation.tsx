import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SupplierPlantationState {
  estateids: [] | null;
  milltabledata: [] | null;
  tabledata: [] | null;
  tableColumn: [] | null;
  tabledataPotential: [] | null;
}

const initialState: SupplierPlantationState = {
  estateids: [],
  milltabledata: [],
  tabledata: [],
  tableColumn: [],
  tabledataPotential: [],
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
    setmilltabledata: (state, action: PayloadAction<[] | null>) => {
      state.milltabledata = action.payload;
    },
    settabledataPotential: (state, action: PayloadAction<[] | null>) => {
      state.tabledataPotential = action.payload;
    },
    settableColumn: (state, action: PayloadAction<[] | null>) => {
      state.tableColumn = action.payload;
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  setestateids,
  settabledata,
  setmilltabledata,
  settableColumn,
  settabledataPotential,
} = SupplierPlantation.actions;

export default SupplierPlantation.reducer;
