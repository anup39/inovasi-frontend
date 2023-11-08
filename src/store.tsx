import { configureStore } from "@reduxjs/toolkit";
import Auth from "./reducers/Auth";

export const store = configureStore({
  reducer: {
    auth: Auth,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
