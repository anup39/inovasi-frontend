import { createSlice } from "@reduxjs/toolkit";

// Template............

interface MillsState {
  mills: string | null;
}

const initialState: MillsState = {
  mills: null,
};

export const Auth = createSlice({
  name: "MillsState",
  initialState,
  reducers: {},
});
