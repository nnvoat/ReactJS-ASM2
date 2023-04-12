import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { API_KEY, urlImage } from "../GetAPI/GetAPI";
import styles from "./MovieDetail.module.css";

const MovieDetail = (props) => {
  // Hook
  const [isVideo, setIsVideo] = useState(false);
  const [keyVideo, setKeyVideo] = useState("");
  // Hook loading Api
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Hook new

  useEffect(() => {
    (async () => {
      if (props.movieData.id !== undefined) {
        setIsLoading(true);
        setError(null);
        try {
          const linkAPI = `https://api.themoviedb.org/3/movie/${props.movieData.id}/videos?api_key=${API_KEY}`;
          const response = await fetch(linkAPI);
          // console.log(response);

          if (!response.ok) {
            throw new Error("Something went wrong!");
          }

          const data = await response.json();
          // console.log(data);
          if (data.results.length === 0) {
            setIsVideo(false);
          } else {
            setIsVideo(true);
            const videos = data.results.filter((item) => {
              return (
                (item.site === "Youtube" && item.type === "Tester") ||
                item.type === "Trailer"
              );
            });
            const trailers = videos.filter((item) => item.type === "Trailer");
            if (trailers.length === 0) {
              setKeyVideo(videos[0].key);
            } else {
              setKeyVideo(trailers[0].key);
            }
          }

          setIsLoading(false);
        } catch (error) {
          setError(error.message);
        }
      }
    })();
  }, [props.movieData.id]);

  const opts = {
    height: "400",
    with: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <React.Fragment>
      <div className={styles.detailmain}>
        <div key={props.movieData.key} className={styles.detaildiv}>
          <h1>{`${props.movieData.name} ${props.movieData.title}`}</h1>
          <div className={styles.bodertop}>
            <p>
              <strong>{`Release Date: ${props.movieData.release_date} ${props.movieData.first_air_date}`}</strong>
            </p>
            <p>
              <strong>{`Vote: ${props.movieData.vote_average}/10`}</strong>
            </p>
            <p>{props.movieData.overview}</p>
          </div>
        </div>
        <div>
          {isVideo ? (
            <YouTube videoId={keyVideo} opts={opts} />
          ) : (
            <img
              src={urlImage + props.movieData.backdrop_path || "#"}
              alt={urlImage + props.movieData.backdrop_path || "#"}
            />
          )}
        </div>
      </div>
      {!isLoading && error && <p>{error}</p>}
    </React.Fragment>
  );
};

export default MovieDetail;

// Cần lấy sang id để get API

// Phần nội dung hiển thị return có :
// 1. title hoặc name (name la original)
// 2. release_date
// 3. vote_average
// 4. overview
// 5. Youtube
//  <h1>{props.movieData.title}</h1>;
