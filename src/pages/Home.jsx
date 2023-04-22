import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";

export default function Home() {
  const [isNavigate, setIsNavigate] = useState(false);
  const navigate = useNavigate();

  const clickHandler = (link) => {
    setIsNavigate(true);
    const timer = setTimeout(() => {
      navigate(link);
      setIsNavigate(false);
    }, 2000);
  };

  return (
    <div className="outer-container home">
      <div className={`img-container ${isNavigate && "img_anime"}`}>
        <img src="/images/spd.png" alt="spiderman" className="home_img" />
      </div>
      <div className={`logo home_logo ${isNavigate && "logo_anime"}`}>
        <Link to="/">MOVIFLIX</Link>
      </div>

      <div className="web web-1"></div>
      <div
        className={`navlink home_nav-1 ${isNavigate && "navitem_anime_1"}`}
        onClick={clickHandler.bind(null, "/popular")}
      >
        Popular
      </div>

      <div className="web web-2"></div>
      <div
        className={`navlink home_nav-2 ${isNavigate && "navitem_anime_2"}`}
        onClick={clickHandler.bind(null, "/movies")}
      >
        Movies
      </div>

      <div className="web web-3"></div>
      <div
        className={`navlink home_nav-3 ${isNavigate && "navitem_anime_3"}`}
        onClick={clickHandler.bind(null, "/upcoming")}
      >
        Upcoming
      </div>

      <div className="web web-4"></div>
      <div
        className={`navlink home_nav-4 ${isNavigate && "navitem_anime_4"}`}
        onClick={clickHandler.bind(null, "/tvseries")}
      >
        TV Series
      </div>
    </div>
  );
}
