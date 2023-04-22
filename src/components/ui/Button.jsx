import { Link } from "react-router-dom";

import "./Button.css";

export default function Button({ children, className, link }) {
  return (
    <Link to={link} className={`btn ${className}`}>
      {children}
    </Link>
  );
}
