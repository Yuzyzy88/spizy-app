import React, { useState, FunctionComponent } from "react";
import { Footer } from "../components/footer";
import { NavigationBar } from "../components/navbar";
// import { UserProvider } from "../state/usercontext";

export function BaseLayout({children}) {
  return (
    <>
        <NavigationBar></NavigationBar>
        {children}
        <Footer></Footer>
    </>
  );
};
