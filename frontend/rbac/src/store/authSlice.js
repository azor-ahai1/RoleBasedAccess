import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: 'abc', 
    userAuth: false, 
    adminAuth: true, 
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.userAuth = true; 
    },
    logout(state) {
      state.user = null; 
      state.userAuth = false; 
      state.adminAuth = false;  
    },
    setAdminAuth(state, action) {
      state.adminAuth = action.payload;
    },
  },
});

export const { login, logout, setAdminAuth } = authSlice.actions;
export const selectUser  = (state) => state.auth.user; 
export const selectUserAuth = (state) => state.auth.userAuth; 
export const selectAdminAuth = (state) => state.auth.adminAuth; 
export default authSlice.reducer;