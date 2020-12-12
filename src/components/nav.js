import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function Nav(props) {
  return (
    <nav className="nav">
      <Link className="nav__link" to="/account">
        {props.user ? "Account" : "Login"}
      </Link>{" "}
      |{" "}
      <Link className="nav__link" to="/">
        All Books
      </Link>{" "}
      |{" "}
      <Link className="nav__link" to="/add">
        Add Book
      </Link>
    </nav>
  );
}

export default Nav;
