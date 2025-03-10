import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    curComponent: 'home',
  },
  reducers: {
    setCompomemt: (state, action) => {
      state.curComponent = action.payload;
    },
  },
});

export const { setCompomemt } = layoutSlice.actions;
export default layoutSlice.reducer;
