import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: null, type: "info" };
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notify(state, action) {
      const message = action.payload;
      console.log(message);
      return message;
    },
    clear() {
      return initialState;
    },
  },
});

export const { notify, clear } = notificationSlice.actions;

export const setNotification = (data, timeout) => {
  return async (dispatch) => {
    console.log(data);
    console.log("timeout");
    console.log(timeout);
    dispatch(notify(data));
    setTimeout(() => {
      dispatch(clear());
    }, timeout);
  };
};

export default notificationSlice.reducer;

// old version
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = { data: null, type: "info" };
// const notificationSlice = createSlice({
//   name: "notification",
//   initialState,
//   reducers: {
//     setNotification(state, action) {
//       const message = action.payload;
//       return message;
//     },
//     removeNotification() {
//       return initialState;
//     },
//   },
// });

// export const { setNotification, removeNotification } =
//   notificationSlice.actions;

// export default notificationSlice.reducer;
