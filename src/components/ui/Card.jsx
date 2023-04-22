import { Link } from "react-router-dom";
import ISO6391 from "iso-639-1";

import "./Card.css";
import { getGenreName } from "../../utils/utlity";

export default function Card({ data }) {
  const dataLink =
    data.media_type === "person"
      ? `/person/${data.id}`
      : `/details/${data.type}/${data.id}`;

  return (
    <Link to={dataLink} className="card">
      <div className="card_rating">
        {data.vote_average ? data.vote_average.toFixed(1) : "0"}
      </div>
      <div className="card_img_container">
        <img
          src={`${import.meta.env.VITE_IMAGE_BASE_URL}${
            data.poster_path || data.profile_path
          }`}
          alt={data.title || data.name}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/images/noposter.jpg";
          }}
        />
      </div>
      <div className="card_title_container">
        <div className="card_title">
          {data.title && data.title.length > 18
            ? data.title.slice(0, 18) + "..."
            : data.title}
          {data.name && data.name.length > 18
            ? data.name.slice(0, 18) + "..."
            : data.name}
        </div>
        <div className="card_release_date">
          {data.release_date && <p>{data.release_date.slice(0, 4)}</p>}
          {data.first_air_date && (
            <p>{"S01: " + data.first_air_date.slice(0, 4)}</p>
          )}
          <p>{ISO6391.getName(data.original_language)}</p>
        </div>
        <div className="card_genres">
          {data.genre_ids &&
            getGenreName(data.genre_ids).map((item) => (
              <div className="card_genre" key={item}>
                {item}
              </div>
            ))}
        </div>
      </div>
    </Link>
  );
}
