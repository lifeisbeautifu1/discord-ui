import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChannelState {
  id: string | null;
  name: string | null;
}

const initialState: ChannelState = {
  id: null,
  name: null,
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannelInfo: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
  },
});

export const { setChannelInfo } = channelSlice.actions;

export default channelSlice.reducer;
