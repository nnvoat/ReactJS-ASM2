import React from "react";
import Navbar from "./Navbar/Navbar";
import Banner from "./Banner/Banner";
import MovieList from "./MovieList/MovieList";
import styles from "./Browse.module.css";
// Hien thi trang Browse
// Them Navbar(Navbar.jsx la component con)
// Them API

function Browse() {
  return (
    <div className={styles.browsemain}>
      <Navbar />
      <Banner />
      <MovieList />
    </div>
  );
}

export default Browse;
