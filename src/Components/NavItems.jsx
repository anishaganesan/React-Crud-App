import * as Icons from "react-icons/fa";
import React from "react";
export const NavItems = [
  {
    id: 1,
    title: "Home",
    path: "/home",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaHome />,
  },
  {
    id: 2,
    title: "Users Details",
    path: "/all",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaBriefcase />,
  },
  {
    id: 3,
    title: "Products",
    path: "/home",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaCartArrowDown />,
  },
  {
    id: 4,
    title: "Contact Us",
    path: "./home",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.FaPhone />,
  },
];