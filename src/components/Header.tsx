import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

function Header() {
  return (
    <header className="">
      <div className="header-custom row">
        <div className="col-12 col-lg-3">
        <img
          src="https://www.kidsplaza.vn/static/version486/frontend/Smartosc/kidsplaza/vi_VN/images/logo.png"
          alt="ok"
        />
        </div>
        
        <div className="col-12 col-lg-9"></div>
      </div>
    </header>
  );
}

export default Header;
