import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    showUsersAction(state, action) {
      // console.log("haetaan käyttäjät");
      // console.log(action.payload);
      return action.payload;
    },
  },
});

export const { showUsersAction } = userSlice.actions;

export const showUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(showUsersAction(users));
  };
};

export default userSlice.reducer;
