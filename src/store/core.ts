import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

export interface CoreState {
  error: string;
}

export const coreSlice = createSlice({
  name: "core",
  initialState: {
    error: "",
  } as CoreState,
  reducers: {
    updateError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { updateError } = coreSlice.actions;
export default coreSlice.reducer;
