import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationreducer";
import blogreducer from "./reducers/blogreducer";
import userreducer from "./reducers/userreducer";
import usersreducer from "./reducers/usersreducer";

const Store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogreducer,
    user: userreducer,
    users: usersreducer,
  },
  devTools: true,
});

export default Store;
