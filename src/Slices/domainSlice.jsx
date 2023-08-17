import { createSlice } from '@reduxjs/toolkit';

export const domainSlice = createSlice({
    name: "domainSlice",
    initialState: {
        value: "localhost:7108"
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { update } = domainSlice.actions;

export default domainSlice.reducer;