import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: -1,
        email: "",
        name: "",
        plannedUserId: -1,
        token: ""
    },
    reducers: {
        updateId: (state, action) => {
            state.id = action.payload;
        },
        updateUserEmail: (state, action) => {
            state.email = action.payload;
        },
        updateName: (state, action) => {
            state.name = action.payload;
        },
        updatePlannedTasksId: (state, action) => {
            state.plannedUserId = action.payload
        },
        updateToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

export const { updateId, updateUserEmail, updateName, updatePlannedTasksId, updateToken } = userSlice.actions;

export default userSlice.reducer;