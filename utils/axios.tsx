import Axios, { AxiosRequestConfig } from "axios";

export const axios_instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
});
export async function get_csrf_token(){
  return (await axios_instance.get("/csrftoken")).data.token
}