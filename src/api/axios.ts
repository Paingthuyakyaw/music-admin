import Axios from "axios";
import { authJsonHeader } from "../util/util";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axios = Axios.create({
  baseURL: BASE_URL,
});

export const logout = async () => {
  const { data } = await axios.get("logout", {
    headers: authJsonHeader(),
  });
  return data;
};
