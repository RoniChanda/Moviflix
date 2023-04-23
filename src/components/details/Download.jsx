import Button from "../ui/Button";

import "./Download.css";

export default function Download({ dLinks, type, name }) {
  return (
    <div className="download">
      <p>
        Download <span style={{ fontSize: "1.4rem" }}>(--Need Vpn--)</span>
      </p>

      <div className="download-btns">
        {dLinks &&
          dLinks.map((item, index) => (
            <Button key={index} link={item.url} className="download-btn">
              <i className="fa-solid fa-magnet icon magnet_icon"></i>
              {item.quality + "|" + item.size}
            </Button>
          ))}
        <Button
          link={`https://allmovieshub.art/?s=${name}`}
          target="_blank"
          className="download-btn allmovieshub"
        >
          <i className="fa-solid fa-arrow-up-right-from-square icon"></i>
          Movieshub
        </Button>
        <Button
          link={`https://www.1377x.to/search/${name}/1/`}
          target="_blank"
          className="download-btn btn-1337x"
        >
          <i className="fa-solid fa-arrow-up-right-from-square icon"></i>1337X
        </Button>
        {type === "tv" && (
          <Button
            link={`https://ytstv.me/?s=${name}`}
            target="_blank"
            className="download-btn ytstv"
          >
            <i className="fa-solid fa-arrow-up-right-from-square icon"></i>
            ytstv.me
          </Button>
        )}
      </div>

      {/* {!dLinks && ty <p style={{ fontSize: "1.6rem" }}>--</p>} */}
    </div>
  );
}
