import React from "react";
import styles from "./NavbarSearch.module.css";
import { FaSearch } from "react-icons/fa";

// 2. Tao Navbar
const NavbarSearch = () => {
  return (
    <div className={`${styles.navbarmain} `}>
      <div
        onClick={() => {
          window.location.assign("/");
        }}
      >
        <p>Movie app</p>
      </div>
      <div>
        <a href="/search" target="_blank">
          <FaSearch />
        </a>
      </div>
    </div>
  );
};

export default NavbarSearch;
