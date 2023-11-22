import { configureStore } from "@reduxjs/toolkit";
import Auth from "./reducers/Auth";
import DisplaySettings from "./reducers/DisplaySettings";

export const store = configureStore({
  reducer: {
    auth: Auth,
    displaySettings: DisplaySettings,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
