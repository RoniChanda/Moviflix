import { Fragment } from "react";

import Button from "./Button";
import "./CarouselItem.css";

export default function CarouselItem({ movie }) {
  return (
    <Fragment>
      <div className="movie_img">
        <img
          src={`${import.meta.env.VITE_IMAGE_BASE_URL}${
            movie && movie.backdrop_path
          }`}
          alt={movie.title}
        />
      </div>
      <div className="movie_content">
        <div className="movie_title">{movie ? movie.title : ""}</div>
        <div className="movie_info">
          {movie ? movie.release_date : ""}
          <span>
            <i className="fas fa-star icon" style={{ color: "#f08c00" }} />
            {movie ? movie.vote_average : ""}
          </span>
          <Button
            link={`/details/${movie.type}/${movie.id}`}
            className="movie_trailer_btn"
          >
            <i className="fa-solid fa-play"></i> Trailer
          </Button>
        </div>
        <div className="movie_overview">
          {movie
            ? movie.overview.length > 500
              ? movie.overview.slice(0, 500) + " . . ."
              : movie.overview
            : ""}
        </div>
      </div>
    </Fragment>
  );
}
