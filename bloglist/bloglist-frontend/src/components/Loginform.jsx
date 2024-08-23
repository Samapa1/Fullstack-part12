import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../reducers/userreducer.js";
import { setNotification } from "../reducers/notificationreducer";

import { Button, Input } from "./Styles.jsx";

const loginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    event.target.username.value = "";
    const password = event.target.password.value;
    event.target.password.value = "";
    navigate("/");

    try {
      await dispatch(setUser({ username, password }));
      // const user = useSelector((state) => state.user);
      dispatch(setNotification({ data: "login ok!", type: "info" }, 3000));
    } catch (exception) {
      console.log(exception);
      dispatch(
        setNotification(
          { data: "wrong username or password", type: "error" },
          3000,
        ),
      );
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <Input name="username" />
        </div>
        <div>
          password
          <Input name="password" />
        </div>
        <Button type="submit">log in</Button>
      </form>
    </div>
  );
};
export default loginForm;
