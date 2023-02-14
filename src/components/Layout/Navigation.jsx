import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <ul style={{ display: "flex", justifyContent: "space-between" }}>
        <li>
          <Link to="/">
            <h4>Home</h4>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <h4>Register</h4>
          </Link>
        </li>
        <li>
          <Link to="/bookreservation">
            <h4>Book reservation</h4>
          </Link>
        </li>
        <li>
          <Link to="/recommendations">
            <h4>Book recommendations</h4>
          </Link>
        </li>
        <li>
          <Link to="/news">
            <h4>News</h4>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
