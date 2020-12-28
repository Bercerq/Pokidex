import React, { useState } from "react";
import TypeNav_css from "./TypeNav.module.css";

function TypeNavItem(props) {

    const[open, setOpen] = useState(false)

  return (
    <li className={TypeNav_css.nav_item}>
      <p className={TypeNav_css.icon_button} onClick={()=> setOpen(!open)}>
        {props.icon}
      </p>

      {open && props.children}
    </li>
  );
}

export default TypeNavItem;
