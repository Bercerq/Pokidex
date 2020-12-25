import React from "react";
import TypeNav_css from "./TypeNav.module.css";

function TypeNav(props) {
  return (
    <nav className={TypeNav_css.navbar}>
      <ul className={TypeNav_css.navbar_nav}>{props.children}</ul>
    </nav>
  );
}

export default TypeNav;
