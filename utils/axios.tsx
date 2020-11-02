import Axios from "axios";

export const axios_instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true
});
