import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import countdownReducer from '../features/countdown/Countdown';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    countdown: countdownReducer
  },
});
