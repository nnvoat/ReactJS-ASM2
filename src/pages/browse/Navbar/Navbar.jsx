import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FaSearch } from "react-icons/fa";

// 2. Tao Navbar
const Navbar = () => {
  const [navbarBlack, setNavbarBlack] = useState(false);
  // Su kien scroll
  useEffect(() => {
    const scrollWindowY = () => {
      if (window.scrollY > 100) {
        setNavbarBlack(true);
      } else {
        setNavbarBlack(false);
      }
    };
    window.addEventListener("scroll", scrollWindowY);
  }, []);
  return (
    <div
      className={`${styles.navbarmain} ${
        navbarBlack ? styles.navbarblack : !styles.navbarblack
      }`}
    >
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

export default Navbar;
