import "./RightInfo.css";
import ISO6391 from "iso-639-1";

export default function RightInfo({ details }) {
  return (
    <div className="details_info_right">
      <p>{ISO6391.getName(details.original_language) || "--"}</p>
      <span>
        <i className="fas fa-star icon" style={{ color: "#f08c00" }}></i>
        {details.vote_average ? details.vote_average.toFixed(1) + " " : "0 "}(
        {details.vote_count || "0"}
        {details.vote_count > 1 ? " votes" : " vote"})
      </span>

      <span>
        {Math.round(details.popularity) > 50 ? (
          <i
            className="fa-solid fa-arrow-trend-up icon"
            style={{ color: "#2f9e44" }}
          ></i>
        ) : (
          <i
            className="fa-solid fa-arrow-trend-down icon"
            style={{ color: "#e03131" }}
          ></i>
        )}
        {Math.round(details.popularity) || "0"}
      </span>
    </div>
  );
}
