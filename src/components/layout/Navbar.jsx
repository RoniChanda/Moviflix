import { NavLink } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <div className="logo nav_logo">
        <NavLink to="/">MOVIFLIX</NavLink>
      </div>

      <NavLink
        to="/popular"
        className={({ isActive }) =>
          `navlink side_nav side_nav-1 ${isActive && "active"}`
        }
      >
        Popular
      </NavLink>

      <NavLink
        to="/movies"
        className={({ isActive }) =>
          `navlink side_nav side_nav-2 ${isActive && "active"}`
        }
      >
        Movies
      </NavLink>

      <NavLink
        to="/upcoming"
        className={({ isActive }) =>
          `navlink side_nav side_nav-3 ${isActive && "active"}`
        }
      >
        Upcoming
      </NavLink>

      <NavLink
        to="/tvseries"
        className={({ isActive }) =>
          `navlink side_nav side_nav-4 ${isActive && "active"}`
        }
      >
        TV Series
      </NavLink>
    </nav>
  );
}
