// import axios from "axios";
import axios from "../util/apiClient";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll };
