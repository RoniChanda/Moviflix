import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBox.css";
import useHttp from "../../hooks/useHttp";
import SearchBoxItem from "./SearchBoxItem";

export default function SearchBox() {
  const [query, setQuery] = useState();
  const [focus, setFocus] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const { searchKeyword } = useHttp();

  const clickHandler = (e) => {
    sessionStorage.setItem("all", 1);
    navigate(`/search/${query}`);
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
    searchKeyword(e.target.value, 1).then((data) => {
      setSearchResults(data.results);
    });
  };

  return (
    <div
      className={`search_box ${focus && "search_box_onfocus"}`}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <input
        type="text"
        onChange={changeHandler}
        placeholder="Search movie/tv/person...."
        className={`search_input`}
      />
      {searchResults.length !== 0 ? (
        <div className={`search_box_results`}>
          {searchResults.slice(0, 5).map((item) => (
            <SearchBoxItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p style={{ fontSize: "1.4rem", textAlign: "center", padding: "1rem" }}>
          Click on search button after typing the keyword to get all results
        </p>
      )}
      <button className="search-btn" type="button" onClick={clickHandler}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
}
