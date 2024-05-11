import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ErrorState {
  error: string;
}

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    error: "",
  } as ErrorState,
  reducers: {
    updateError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { updateError } = errorSlice.actions;
export default errorSlice.reducer;
