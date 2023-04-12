import React, { useEffect, useState } from "react";
import { requests, urlImage } from "../GetAPI/GetAPI";
import styles from "./Banner.module.css";

const Banner = () => {
  const [film, setFilm] = useState();
  useEffect(() => {
    async function fetchData() {
      const url = `${requests.fetchNetflixOriginals}`;
      // console.log(url);
      const response = await fetch(url);
      // console.log(response);
      const data = await response.json();
      // console.log(data.results);
      const filmRandom =
        data.results[Math.floor(Math.random() * data.results.length - 1)];
      // console.log(filmRandom);
      setFilm(filmRandom);
    }
    fetchData();
  }, []);

  const bgUrl = film ? urlImage + film.backdrop_path : "";
  // console.log(bgUrl);

  return (
    <div
      className={styles["banner-container"]}
      style={{
        backgroundImage: `url(${bgUrl})`,
      }}
    >
      <h1 className={styles.title}>{film && film.name}</h1>
      <div className={styles["button-banner"]}>
        <button>Play</button>
        <button>My List</button>
      </div>
      {film && <p className={styles.overview}>{film.overview}</p>}
    </div>
  );
};

export default Banner;
