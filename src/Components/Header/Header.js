import React from "react";
import "./Header.scss";
import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img className="picture" src={logo} alt="" />
      </Link>
    </div>
  );
};

export default Header;
