// import axios from "axios";
const baseUrl = "/api/login";
import axios from "../util/apiClient";

const login = async (logindata) => {
  const response = await axios.post(baseUrl, logindata);
  return response.data;
};

export default { login };
