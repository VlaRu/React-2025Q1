import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
}

export const initialState: CounterState = {
  value: 0
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      if (state.value >= 0) {
        state.value -= 1;
      }
    },
    resetCount: (state) => {
      state.value = 0;
    }
  }
});

export const { incremented, decremented, resetCount } = counterSlice.actions;
