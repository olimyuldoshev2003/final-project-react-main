import React from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className={`${styles.layout}`}>
        <header></header>
        <Outlet />
        <footer></footer>
      </div>
    </>
  );
};

export default Layout;
