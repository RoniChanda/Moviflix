import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import useHttp from "../hooks/useHttp";
import Paginate from "../components/ui/Paginate";
import {
  getEndYears,
  getFilterResult,
  getStartYears,
  languageRearrange,
} from "../utils/utlity";
import "./FilterContainer.css";

export default function Movies() {
  const { loadGenres, loadPopular } = useHttp();
  const { movieGenres, popularMovies, pages } = useSelector(
    (state) => state.movie
  );
  const [pageNum, setPageNum] = useState(
    Number(sessionStorage.getItem("movie")) || 1
  );
  const [sortingType, setSortingType] = useState(
    sessionStorage.getItem("m_sort")
      ? "." + sessionStorage.getItem("m_sort").split(".")[1]
      : ".desc"
  );
  const [filterData, setFilterData] = useState({
    genre: Number(sessionStorage.getItem("m_genre")) || "",
    rating: Number(sessionStorage.getItem("m_rating")) || "",
    language: sessionStorage.getItem("m_language") || "",
    sort: sessionStorage.getItem("m_sort") || "vote_count.desc",
    startYear: Number(sessionStorage.getItem("m_startYear")) || 1900,
    endYear:
      Number(sessionStorage.getItem("m_endYear")) || new Date().getFullYear(),
  });

  useEffect(() => {
    loadGenres("movie");
    loadPopular("movie", pageNum, ...Object.values(filterData));
  }, [pageNum, filterData]);

  const inputHandler = (e) => {
    sessionStorage.setItem("movie", 1);
    setPageNum(1);
    setFilterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    sessionStorage.setItem("m_" + [e.target.name], [e.target.value]);
  };

  const sortHandler = () => {
    setSortingType(sortingType === ".desc" ? ".asc" : ".desc");
    const sortArr = filterData.sort.split(".");
    const sortValue =
      sortArr[1] === "desc" ? sortArr[0] + ".asc" : sortArr[0] + ".desc";
    setFilterData((prevState) => ({ ...prevState, sort: sortValue }));
    sessionStorage.setItem("m_sort", sortValue);
  };

  return (
    <Container className="movies_tv">
      <div className="filter_container">
        {/* //# Genre Input */}
        <div className="filter_input">
          <label htmlFor="genre">Genre :</label>
          <select
            name="genre"
            id="genre"
            onChange={inputHandler}
            value={filterData.genre}
          >
            <option value="">All</option>
            {movieGenres.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {/* //# Rating Input */}
        <div className="filter_input">
          <label htmlFor="rating">Rating :</label>
          <select
            name="rating"
            id="rating"
            onChange={inputHandler}
            value={filterData.rating}
          >
            <option value="">All</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            <option value="6">6+</option>
            <option value="5">5+</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
            <option value="1">1+</option>
          </select>
        </div>
        {/* //# Language Input */}
        <div className="filter_input">
          <label htmlFor="language">Language :</label>
          <select
            name="language"
            id="language"
            onChange={inputHandler}
            value={filterData.language}
          >
            <option value="">All</option>
            {languageRearrange().map((item) => (
              <option key={item.code} value={item.code}>
                {item.language}
              </option>
            ))}
          </select>
        </div>
        {/* //# Start Year Input */}
        <div className="filter_input">
          <label htmlFor="start_year">Start :</label>
          <select
            name="startYear"
            id="start_year"
            onChange={inputHandler}
            value={filterData.startYear}
          >
            {getStartYears(filterData.endYear).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* //# End year Input */}
        <div className="filter_input">
          <label htmlFor="end_year">End :</label>
          <select
            name="endYear"
            id="end_year"
            onChange={inputHandler}
            value={filterData.endYear}
          >
            {getEndYears(filterData.startYear).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* //# Sort By Input */}
        <div className="filter_input">
          <label htmlFor="sort">Sort By :</label>
          <div className="sort_inner">
            <select
              name="sort"
              id="sort"
              onChange={inputHandler}
              value={filterData.sort}
            >
              <option value={"vote_count" + sortingType}>Vote</option>
              <option value={"vote_average" + sortingType}>Rating</option>
              <option value={"popularity" + sortingType}>Popularity</option>
              <option value={"primary_release_date" + sortingType}>Year</option>
              <option value={"revenue" + sortingType}>Revenue</option>
            </select>

            <button type="button" onClick={sortHandler} className="sort-btn">
              <i
                className={`fa-solid fa-arrow-${
                  sortingType === ".desc" ? "up" : "down"
                }`}
              ></i>
            </button>
          </div>
        </div>
      </div>
      {/* //# Paginate */}
      <div className="grid_container">
        {/* //# Show filter result in words */}
        <p className="filter_result">
          {getFilterResult(
            ...Object.values(filterData),
            Number(sessionStorage.getItem("m_genre"))
          )}
        </p>
        {/* //# Paginate */}
        {pages !== 0 && (
          <div className="paginate_container">
            <Paginate onload={setPageNum} type="movie" pages={pages} />
          </div>
        )}
        {/* //# Show cards */}
        {pages !== 0 &&
          popularMovies.map((item) => <Card data={item} key={item.id} />)}
        {!pages && <p className="no_result">No results</p>}
      </div>
    </Container>
  );
}
