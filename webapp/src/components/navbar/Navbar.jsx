import React from "react";
//import "./header.styles.scss";
//import { Link } from "react-router-dom";



const logOut = (response) => {
    console.log('you should logout');
  };
  

const NavBar = () => (
  <div className="header">
    <Link to="/" className="logo-container">
      <Logo className="logo"></Logo>
    </Link>
    <div className="options">
      <Link to="/shop" className="option">
        SHOP
      </Link>
      <div className="option" onClick={() => logOut()}>
          Log out
        </div> 
    </div>
  </div>
);
export default NavBar;