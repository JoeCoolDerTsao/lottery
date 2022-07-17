import { createSlice } from '@reduxjs/toolkit'
import { transferTimeToString, create_Participants } from './CountdownAPI';

const initialState = {
  countSecs: 0.01,
  countdownString: '00:00',
  participants: [],
  luckyPeople : ""
}

export const countdownSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    resetState: (state) => {
      state.countdownString = '00:00';
      state.luckyPeople = '';
    },
    setCountMins: (state, action) => {
      state.countSecs = action.payload * 60;
      state.countdownString = transferTimeToString(state.countSecs);
    },
    countdownExcu: (state) => {
      if( state.countSecs > 0 ) {
        state.countSecs --;
        state.countdownString = transferTimeToString(state.countSecs);
      }
    },
    createParticipants: (state, action) => {
      let nums = 0;
      if ( action.payload > 0 ) nums = action.payload;
      state.participants = create_Participants(nums);
    },
    lotteryDraw: (state) => {
      state.luckyPeople = state.participants[Math.floor(Math.random() * state.participants.length)].name;
    }
  },
})

export const { resetState, countdownExcu, setCountMins, createParticipants, lotteryDraw } = countdownSlice.actions;

export const countdownString = (state) => state.countdown.countdownString;

export const countdownSecs = (state) => state.countdown.countSecs;

export const participants = (state) => state.countdown.participants;

export const iAmLuckyMan = (state) => state.countdown.luckyPeople;

export default countdownSlice.reducer