import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user_id: string | null;
  username: string | null;
  piechartfor: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user_id: localStorage.getItem("user_id"),
  username: localStorage.getItem("username"),
  piechartfor: "facility",
};

export const Auth = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.user_id = action.payload;
    },
    setUserName: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
    setpiechartfor: (state, action: PayloadAction<string | null>) => {
      state.piechartfor = action.payload;
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const { setToken, setUserId, setUserName, setpiechartfor } =
  Auth.actions;

export default Auth.reducer;
