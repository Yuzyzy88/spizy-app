import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AnonymouseHome } from "../components/home_anonymous";
import { LoggedInHome } from "../components/home_loggedin";
import { RootState } from "../state/reducers";
import { useThunkDispatch } from "../state/store";
import { check_login } from "../state/userSlice";

export function Home() {
  const { logged_in } = useSelector((state: RootState) => state.user);
  const thunkDispatch = useThunkDispatch()
  useEffect(() => {
    thunkDispatch(check_login());
  },[])
  return <>{logged_in ? <LoggedInHome /> : <AnonymouseHome />}</>;
}
export default Home;
