import { createSlice } from "@reduxjs/toolkit";

export const calcSlice = createSlice({
  name: "calc",
  initialState: {
    calc: 0,
  },
  reducers: {
    evenCalculator: (state) => {
      state.calc += 2;
    },
  }
});

// Action creators are generated for each case reducer function
export const { evenCalculator } = calcSlice.actions;
export default calcSlice.reducer;