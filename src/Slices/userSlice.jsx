import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: -1,
        email: "",
        name: "",
        plannedUserId: -1
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
        }
    }
});

export const { updateId, updateUserEmail, updateName, updatePlannedTasksId } = userSlice.actions;

export default userSlice.reducer;