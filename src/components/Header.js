import React from "react";

import logo from "../images/logo.png";

const Header = () => (
  <header className="header">
    <div className="header--container">
      <img src={logo} alt="logo troll face" className="header--logo" />
      <h2 className="header--title">Meme Generator</h2>
    </div>
    <h4 className="header--description">React Course - Project 3</h4>
  </header>
);

export default Header;
