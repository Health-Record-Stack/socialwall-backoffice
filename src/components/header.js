import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";

const Header = () => (
  <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
    <a className="navbar-brand mr-0 mr-md-2" href="/" aria-label="Bootstrap">
      <h4 className="mb-0">Social Wall</h4>
    </a>

    <div className="navbar-nav-scroll">
      <ul className="navbar-nav bd-navbar-nav flex-row">
        <li className="nav-item">
          <NavLink className="nav-link" to="/" exact>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/add">
            Bulk Add
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/edit">
            Edit
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/aboutus">
            About Us
          </NavLink>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
