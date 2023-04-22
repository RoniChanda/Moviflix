import { Fragment } from "react";

import "./LeftInfo.css";

export default function LeftInfo({ details, type }) {
  let leftInfo;

  if (type === "movie") {
    leftInfo = (
      <Fragment>
        <p>{details.status || "--"}</p>
        <p>{details.release_date || "--"}</p>
        <p>{details.runtime ? details.runtime + " min" : "--"}</p>
      </Fragment>
    );
  } else {
    leftInfo = (
      <Fragment>
        <p>{details.status || "--"}</p>
        {details.first_air_date && details.last_air_date ? (
          <p>
            {details.first_air_date.split("-")[0]}
            {details.first_air_date.split("-")[0] ===
            details.last_air_date.split("-")[0]
              ? ""
              : " - " + details.last_air_date.split("-")[0]}
          </p>
        ) : (
          <p>--</p>
        )}
        {details.number_of_seasons ? (
          <p>
            {details.number_of_seasons}{" "}
            {details.number_of_seasons > 1 ? " seasons" : " season"}
          </p>
        ) : (
          <p>--</p>
        )}
      </Fragment>
    );
  }

  return <div className="details_info_left">{leftInfo}</div>;
}
