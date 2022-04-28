import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import "./Navbar.css";

import { NavItems } from "./NavItems";
import Navbar from "./Navbar";

function Navibar() {
    const [mobile, setMobile] = useState(true);
    const [sidebar, setSidebar] = useState(true);
  
    useEffect(() => {
      if (window.innerWidth < 1065) {
        setMobile(true);
      }
    }, []);
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 1065) {
          setMobile(true);
        } else {
          setMobile(true);
          setSidebar(true);
        }
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);



  return (
    <>
      <div className={sidebar ? "sidebar active" : "sidebar"}>
        <ul className="sidebar-items">
          {NavItems.map((item) => {
            return (
              <li
                key={item.id}
                className={item.sName}
                onClick={() => setSidebar(false)}
              >
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Navibar;