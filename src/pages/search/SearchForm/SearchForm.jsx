import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchForm.module.css";
import ResultList from "../ResultList/ResultList";

const SearchFrom = () => {
  // Dữ liệu nhập vào ô input
  const [input, setInput] = useState("");
  // Dữ liệu để truyền sang ResultList con
  const [valueInput, setValueInput] = useState("");
  const [loadingValid, setLoadingValid] = useState(false);

  // Event click Search
  const handleSearch = () => {
    setLoadingValid(true);
    setValueInput(input);
  };

  // Event click Reset
  const handleReset = () => {
    setLoadingValid(false);
    setValueInput("");
  };

  return (
    <React.Fragment>
      <div className={styles.searchmain}>
        <div className={styles.flex1}>
          <input
            size="80"
            type="text"
            placeholder="batman"
            className={styles.inputsearch}
            onChange={(e) => setInput(e.target.value)}
          />
          <FaSearch className={styles.iconsearch} onClick={handleSearch} />
        </div>
        <div className={styles.flex2}>
          <button
            type="submit"
            className={styles.btnreset}
            onClick={handleReset}
          >
            RESET
          </button>
          <button
            className={styles.btnsearch}
            type="submit"
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>
      </div>
      {loadingValid && <ResultList data={valueInput} />}
    </React.Fragment>
  );
};

export default SearchFrom;
