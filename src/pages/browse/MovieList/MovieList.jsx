import React from "react";
import MovieListItems from "./MovieListItems/MovieListItems";
import { requests } from "../GetAPI/GetAPI";
import styles from "./MovieList.module.css";

const MovieList = () => {
  return (
    <div className={styles.movielistmain}>
      <MovieListItems data={requests.fetchNetflixOriginals} />
      <MovieListItems data={requests.fetchTrending} />
      <MovieListItems data={requests.fetchTopRated} />
      <MovieListItems data={requests.fetchActionMovies} />
      <MovieListItems data={requests.fetchComedyMovies} />
      <MovieListItems data={requests.fetchHorrorMovies} />
      <MovieListItems data={requests.fetchRomanceMovies} />
      <MovieListItems data={requests.fetchDocumentaries} />
    </div>
  );
};

export default MovieList;
