import React from "react";
import SearchFrom from "./SearchForm/SearchForm";
import NavbarSearch from "./NavbarSearch/NavbarSearch";
import styles from "./Search.module.css";

const Search = () => {
  return (
    <div className={styles.searchmain}>
      <NavbarSearch />
      <SearchFrom />
    </div>
  );
};

export default Search;
