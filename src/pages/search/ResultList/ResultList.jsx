import React, { useEffect, useState, useRef } from "react";
import { urlImage, API_KEY } from "../../browse/GetAPI/GetAPI";
import MovieDetail from "../../browse/MovieDetail/MovieDetail";
import styles from "./ResultList.module.css";

const ResultList = (props) => {
  // Hook lưu dữ liệu film
  const [dataFilm, setDataFilm] = useState([]);
  // Hook lấy dữ liệu khi click
  const [clickValueId, setClickValueId] = useState(0);
  // Hook hiển thị hợp lệ
  const [show, setShow] = useState(false);
  // Hook lấy dữ liệu cần hiển thị
  const [eventClick, setEventClick] = useState({});
  // Hook error
  const [error, setError] = useState(null);
  // Hook loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      if (props.data !== undefined) {
        try {
          const linkAPI = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${props.data}&page=1&include_adult=false`;
          const response = await fetch(linkAPI);
          if (!response.ok) {
            throw new Error("Vui lòng nhập dữ liệu!");
          }
          // console.log(response);
          const data = await response.json();
          // console.log(data);
          // console.log(data.results);
          setDataFilm(data.results);
        } catch (error) {
          setError(error.message);
        }
      }
      setLoading(false);
    })();
  }, [props.data]);

  // Logic lấy dữ liệu khi click ảnh
  const valueId = useRef(0);
  useEffect(() => {
    valueId.current = clickValueId;
  }, [clickValueId]);

  // Function khi click vào ảnh
  const handlerClick = (e) => {
    const clickId = e.target.id;
    setClickValueId(clickId);

    if (clickId === valueId.current) {
      setShow(!show);
    } else {
      setShow(true);
    }

    if (clickId === 0) {
      setShow(true);
    }
    // Lọc dữ liệu cần giữ lại
    setEventClick({
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

  // Hiển thị kết quả ảnh
  const imgDataFilm = dataFilm.map((item) => (
    <img
      id={item.id}
      key={item.id}
      src={item.poster_path ? urlImage + item.poster_path : ""}
      onClick={(e) => handlerClick(e)}
      className={styles.imgstyle}
    />
  ));

  return (
    <React.Fragment>
      <div className={styles.resultmain}>
        <h2>Search Result</h2>
        <div>{imgDataFilm}</div>
      </div>
      {!loading && show && <MovieDetail movieData={eventClick} />}
      {!loading && error && <p className={styles.errorr}>{error}</p>}
    </React.Fragment>
  );
};

export default ResultList;
