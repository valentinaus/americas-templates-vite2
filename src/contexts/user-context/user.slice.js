import { createSlice } from "@reduxjs/toolkit";



const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialUserState = {
  userToken: userToken ? userToken : null,
  loading: false,
  userInfo: {
    // userId: "",
    // fullName: "",
    // email: "",
  },
  //   loginState: {
  //     error: "",
  //     isLoading: false,
  //     isLoggedIn: false,
  //   },
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "loggedInUser",
  initialState: initialUserState,
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default userSlice.reducer;
