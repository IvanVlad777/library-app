import React from "react";
import Navigation from "./Navigation";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navigation />
      <div className="children">{children}</div>
    </div>
  );
};

export default Layout;
