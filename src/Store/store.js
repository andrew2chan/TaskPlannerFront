import { configureStore } from '@reduxjs/toolkit';
import domainReducer from '../Slices/domainSlice';
import userReducer from '../Slices/userSlice';


export default configureStore({
  reducer: {
    domain: domainReducer,
    user: userReducer
  }
})