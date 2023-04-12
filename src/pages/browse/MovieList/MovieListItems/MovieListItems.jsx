import React, { useEffect, useState, useRef } from "react";
import { requests, urlImage } from "../../GetAPI/GetAPI";
import styles from "./MovieListItems.module.css";
import MovieDetail from "../../MovieDetail/MovieDetail";

const MovieListItems = (props) => {
  // Hook set tên thể loại film
  const [nameList, setNameList] = useState("");
  // Hook dữ liệu film
  const [dataFilm, setDataFilm] = useState([]);
  // Hook Loading Api
  const [isLoading, setIsLoading] = useState(false);
  // Hook Error Api
  const [error, setError] = useState(null);
  // Hook set điều kiện show cho movieDetail
  const [showData, setShowData] = useState(false);
  // Hook set Data cho compoment movieDetail
  const [dataMovieDetail, setDataMovieDetail] = useState({});
  // Hook lưu giá trị Id sau mỗi lần click vào poster
  const [valueIdClick, setValueIdClick] = useState(0);

  // getAPI dữ liệu film
  useEffect(() => {
    (async () => {
      if (props.data !== undefined) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(props.data);
          // console.log(response);
          // Bắt lỗi
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
          const data = await response.json();
          // console.log(data);
          // Giữ lại thông tin film cần lấy về
          const dataFilmCall = data.results;
          // console.log(dataFilmCall);
          setDataFilm(dataFilmCall);
        } catch (error) {
          setError(error.messange);
        }
        setIsLoading(false);
      }
    })();

    // Hiển thị tên danh sách film
    if (props.data === requests.fetchNetflixOriginals) {
      setNameList("Original");
    } else if (props.data === requests.fetchTrending) {
      setNameList("Xu Hướng");
    } else if (props.data === requests.fetchTopRated) {
      setNameList("Xếp Hạng cao");
    } else if (props.data === requests.fetchActionMovies) {
      setNameList("Hành Động");
    } else if (props.data === requests.fetchComedyMovies) {
      setNameList("Hài");
    } else if (props.data === requests.fetchHorrorMovies) {
      setNameList("Kinh Dị");
    } else if (props.data === requests.fetchRomanceMovies) {
      setNameList("Lãng Mạn");
    } else if (props.data === requests.fetchDocumentaries) {
      setNameList("Tài Liệu");
    }
  }, [props.data]);

  // Lấy dữ liệu cho event click Img
  const valueId = useRef(0);
  useEffect(() => {
    valueId.current = valueIdClick;
  }, [valueIdClick]);
  // console.log(valueIdClick === valueId.current);

  // Event ValueClick CLickImg
  const handleClick = (e) => {
    const clickId = e.target.id;
    setValueIdClick(clickId);
    // console.dir(e.target.id);

    // logic ValueClick
    if (clickId === valueId.current) {
      setShowData(!showData);
    } else {
      setShowData(true);
    }

    // Set dữ liệu để truyền sang MovieDetail
    setDataMovieDetail({
      id: dataFilm
        .filter((el) => el.id == clickId)
        .map((el) => el.id)
        .join(),
      backdrop_path: dataFilm
        .filter((el) => el.id == clickId)
        .map((el) => el.backdrop_path)
        .join(),
      title: dataFilm
        .filter((el) => el.id == clickId)
        .map((el) => el.title)
        .join(),
      name: dataFilm
        .filter((el) => el.id == clickId)
        .map((el) => el.name)
        .join(),
      first_air_date: dataFilm
        .filter((el) => el.id == clickId)
        .map((el) => el.first_air_date)
        .join(),
      release_date: dataFilm
        .filter((el) => el.id == clickId)
        .map((el) => el.release_date)
        .join(),
      vote_average: dataFilm
        .filter((el) => el.id == clickId)
        .map((el) => el.vote_average)
        .join(),
      overview: dataFilm
        .filter((el) => el.id == clickId)
        .map((el) => el.overview)
        .join(),
    });
  };

  const checkOriginals = () => {
    return props.data === requests.fetchNetflixOriginals;
  };

  const dataFilmItems = dataFilm.map((item) => (
    <img
      key={item.id}
      id={item.id}
      onClick={(e) => handleClick(e)}
      className={
        checkOriginals() ? styles.imgposter_path : styles.imgbackdrop_path
      }
      src={
        checkOriginals()
          ? urlImage + item.poster_path
          : urlImage + item.backdrop_path
      }
      alt={
        checkOriginals()
          ? urlImage + item.poster_path
          : urlImage + item.backdrop_path
      }
    />
  ));

  return (
    <React.Fragment>
      <div className={styles.moviemain}>
        <h3>{nameList}</h3>
        <div className={styles.customizeimg}>{dataFilmItems}</div>
      </div>
      {!isLoading && showData && dataFilm.length > 0 && (
        <MovieDetail movieData={dataMovieDetail} />
      )}
      {!isLoading && error && <p>{error}</p>}
      {isLoading && <p>Loading</p>}
    </React.Fragment>
  );
};

export default MovieListItems;
