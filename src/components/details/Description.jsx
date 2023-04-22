import { Link } from "react-router-dom";

import Reviews from "./Reviews";
import "./Description.css";

export default function Description({ details, credits, reviews }) {
  return (
    <div className="description">
      <div className="description_content">
        <h2 className="description_header">Plot Summary</h2>
        <p className="description_overview">{details.overview || "--"}</p>
        <Reviews reviews={reviews} />
      </div>

      <div className="description_content top_casts">
        <h2 className="description_header">Top Casts</h2>
        {!credits && <p style={{ fontSize: "1.6rem" }}>--</p>}
        {credits && credits.length === 0 && (
          <p style={{ fontSize: "1.6rem" }}>--</p>
        )}
        {credits &&
          credits.slice(0, 10).map((item) => (
            <div key={item.id} className="top_cast">
              <img
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}${
                  item.profile_path
                }`}
                alt={item.name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/images/blank_pp.png";
                }}
              />
              <div className="top_cast_name">
                <Link to={`/person/${item.id}`} className="top_cast_original">
                  {item.name}
                </Link>
                <p className="top_cast_character">
                  {item.character ? "as " + item.character : ""}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
