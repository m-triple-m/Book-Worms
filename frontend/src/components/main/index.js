import React from "react";
import { Outlet } from "react-router-dom";
import SearchAppBar from "./header";
import Header from "./header";
const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Main;
