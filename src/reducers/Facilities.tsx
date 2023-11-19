import { createSlice } from "@reduxjs/toolkit";

// Template............

interface FacilitiesState {
  facilities: string | null;
}

const initialState: FacilitiesState = {
  facilities: null,
};

export const Auth = createSlice({
  name: "FacilitiesState",
  initialState,
  reducers: {},
});

// eslint-disable-next-line react-refresh/only-export-components
// export const {} = Auth.actions;
