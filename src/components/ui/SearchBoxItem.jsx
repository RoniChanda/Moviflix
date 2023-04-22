import React from "react";
import { Link } from "react-router-dom";

import "./SearchBoxItem.css";

export default function SearchBoxItem({ item }) {
  const itemLink =
    item.media_type === "person"
      ? `/person/${item.id}`
      : `/details/${item.media_type}/${item.id}`;

  return (
    <div className="search_item_container">
      <Link to={itemLink}>
        <img
          className="search_item_img"
          src={`${import.meta.env.VITE_IMAGE_BASE_URL}${
            item.poster_path || item.profile_path
          }`}
          alt={item.title || item.name}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/images/noposter.jpg";
          }}
        />

        <div className="search_item_content">
          <p className="search_item_title">{item.title || item.name}</p>{" "}
          {item.release_date && <p>{item.release_date.slice(0, 4)}</p>}
          {item.first_air_date && (
            <p>{"S01: " + item.first_air_date.slice(0, 4)}</p>
          )}
        </div>
      </Link>
      <p className="search_item_type">{item.media_type.toUpperCase()}</p>
    </div>
  );
}
