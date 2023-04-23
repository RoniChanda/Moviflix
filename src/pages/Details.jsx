import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Video from "../components/ui/Video";

import useHttp from "../hooks/useHttp";
import "./Details.css";
import LeftInfo from "../components/details/LeftInfo";
import RightInfo from "../components/details/RightInfo";
import Description from "../components/details/Description";
import Container from "../components/ui/Container";
import { commaSeperator } from "../utils/utlity";
import Download from "../components/details/Download";

export default function Details() {
  const [details, setDetails] = useState();
  const [trailerKey, setTrailerKey] = useState("");
  const [credits, setCredits] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [dLinks, setDLinks] = useState([]);
  const { type, id } = useParams();
  const { loadDetails, loadTrailer, loadCredits, loadReviews, downloadLinks } =
    useHttp();

  useEffect(() => {
    loadDetails(type, id).then((data) => setDetails(data));
    loadTrailer(type, id).then((data) => setTrailerKey(data));
    loadCredits(type, id).then((data) => setCredits(data));
    loadReviews(type, id).then((data) => setReviews(data));
  }, [type, id]);

  useEffect(() => {
    if (credits && credits.crew) {
      setDirectors(credits.crew.filter((item) => item.job === "Director"));
      setProducers(credits.crew.filter((item) => item.job === "Producer"));
    }
  }, [credits]);

  useEffect(() => {
    if (details)
      downloadLinks(details.imdb_id).then((results) => {
        console.log(results);
        setDLinks(results);
      });
  }, [details]);

  console.log(dLinks);

  return (
    <Container>
      {details && (
        <Fragment>
          <div
            className="details_backdrop_img"
            style={{
              backgroundImage: `url(${
                import.meta.env.VITE_IMAGE_BASE_URL + details.backdrop_path
              })`,
            }}
          ></div>
          <div className="details_container">
            <div className="details_overlay">
              {/* Title */}
              <h1 className="details_title">
                {type === "movie" ? details.title : details.name}
              </h1>

              <div className="details_info">
                {/* Left part of Info */}
                <LeftInfo type={type} details={details} />

                {/* Right part of Info */}
                <RightInfo details={details} />
              </div>

              {/* Poster */}
              <div className="details_poster_img">
                <img
                  src={
                    import.meta.env.VITE_IMAGE_BASE_URL + details.poster_path
                  }
                  alt={details.title || details.name}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/images/noposter.jpg";
                  }}
                />
              </div>

              {/* Trailer */}
              <Video trailerKey={trailerKey} />
            </div>

            {/* Genres */}
            <div className="details_middle">
              <div className="details_genres">
                {details.genres
                  ? details.genres
                      .slice(0, 5)
                      .map((item) => <p key={item.id}>{item.name}</p>)
                  : "--"}
              </div>

              {type === "movie" && (
                <div className="details_money">
                  <p style={{ color: "#f08c00" }}>
                    Budget: ${commaSeperator(details.budget)}
                  </p>
                  <p
                    style={
                      details.revenue > details.budget
                        ? { color: "#2f9e44" }
                        : { color: "#e03131" }
                    }
                  >
                    Revenue: ${commaSeperator(details.revenue)}
                  </p>
                </div>
              )}
            </div>

            <div className="crew_container">
              {details.tagline && (
                <div className="crew_inner">
                  <p>{details.tagline}</p>
                </div>
              )}
              {directors.length !== 0 && (
                <div className="crew_inner">
                  <p>Director :</p>
                  {directors.slice(0, 4).map((item) => (
                    <Link to={`/person/${item.id}`} key={item.id}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
              {producers.length !== 0 && (
                <div className="crew_inner">
                  <p>Producer :</p>
                  {producers.slice(0, 4).map((item) => (
                    <Link to={`/person/${item.id}`} key={item.id}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <Description
              details={details}
              credits={credits.cast}
              reviews={reviews}
            />

            {/* Download Links */}
            <Download
              dLinks={dLinks}
              type={type}
              name={details.title || details.name}
            />
          </div>
        </Fragment>
      )}
    </Container>
  );
}
