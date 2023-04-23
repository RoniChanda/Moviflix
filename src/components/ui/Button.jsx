import { Link } from "react-router-dom";

import "./Button.css";

export default function Button({ children, className, link, target }) {
  return (
    <Link to={link} className={`btn ${className}`} target={target}>
      {children}
    </Link>
  );
}
