import { configureStore } from "@reduxjs/toolkit";
import { errorSlice } from "./error";

const store = configureStore({
  reducer: {
    error: errorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
