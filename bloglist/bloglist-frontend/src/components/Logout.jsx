import { useDispatch } from "react-redux";
import { removeUser } from "../reducers/userreducer";
import { setNotification } from "../reducers/notificationreducer";
import { useNavigate } from "react-router-dom";
import { Button } from "./Styles.jsx";

const logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(removeUser());
    await dispatch(setNotification({ data: "logged out", type: "info" }, 3000));
    navigate("/");
  };

  return <Button onClick={handleLogout}>log out</Button>;
};

export default logout;
