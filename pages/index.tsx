import React from "react";
import { useSelector } from "react-redux";
import { AnonymouseHome } from "../components/home_anonymous";
import { LoggedInHome } from "../components/home_loggedin";
import { RootState } from "../state/reducers";

export function Home() {
  const { logged_in } = useSelector((state: RootState) => state.user);
  return <>{logged_in ? <LoggedInHome /> : <AnonymouseHome />}</>;
}
export default Home;
