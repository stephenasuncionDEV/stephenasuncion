import { configureStore } from "@reduxjs/toolkit";

import { coreSlice } from "./core";

const store = configureStore({
  reducer: {
    core: coreSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
