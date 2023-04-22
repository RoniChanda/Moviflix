import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import Paginate from "../components/ui/Paginate";

export default function Search() {
  const { query } = useParams();
  const { searchKeyword } = useHttp();
  const [pageNum, setPageNum] = useState(1);
  const [pages, setPages] = useState();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    searchKeyword(query, Number(sessionStorage.getItem("all")) || pageNum).then(
      (data) => {
        data.results.forEach((item) => (item.type = item.media_type));
        setSearchResults(data.results);
        setPages(data.total_pages);
      }
    );
  }, [pageNum, query, sessionStorage.getItem("all")]);

  return (
    <Container className="movies_tv">
      <div className="grid_container">
        <p style={{ fontSize: "1.8rem", gridColumn: "1/-1" }}>
          Showing search results for : {query}
        </p>
        {/* //# Paginate */}
        {pages !== 0 && (
          <div className="paginate_container">
            <Paginate onload={setPageNum} pages={pages} type="all" />
          </div>
        )}
        {pages !== 0 &&
          searchResults.map((item) => <Card data={item} key={item.id} />)}
        {!pages && <p className="no_result">No results</p>}
      </div>
    </Container>
  );
}
