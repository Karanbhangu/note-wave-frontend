import React, { useState, useEffect } from "react";
import "./css/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar(props) {
  let location = useLocation();
  const findJwt = Cookies.get("jwt");
  const navigator = useNavigate();
  useEffect(()=>{
  },[location])
  const [menuState, changeMenuState] = useState("");
  const handleMenu = () => {
    if (menuState === "open")       
    {
      changeMenuState("");
    } else {
      changeMenuState("open");
    }
  };
  const closeMenu = ()=>{
    changeMenuState("");
  }
  return (
    <>
      <nav>
        <div className="lefty">
          <h1>
            <Link to="/">
            <span className="blues">N</span>ote -<span className="blues">W</span>
            ave
            </Link>
          </h1>
        </div>
        <div className="righty">
          <ul>
            <li>
              <Link to="/" className={location.pathname === "/"? "active" :"" }>Home</Link>
            </li>
            <li>
              <Link to="/about" className={location.pathname === "/about"? "active" :"" }>About</Link>
            </li>
            <li>
              <Link to="/notes" className={location.pathname === "/notes"? "active" :"" }>Notes</Link>
            </li>

            <li>
              {findJwt? <Link to="/myaccount" >My Account</Link> :              <Link to="/login" className={location.pathname === "/login"? "active" :"" }>Login</Link>
 }
            </li>

          </ul>
        </div>
        <div
          className={
            menuState === "open" ? "righty-mobile open" : "righty-mobile"
          }
          onClick={handleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
      <div
        className={menuState === "open" ? "mobile-Menu open" : "mobile-Menu"}
      >
        <ul>
          <li>
            <Link to="/" onClick={closeMenu} className={location.pathname === "/"? "active" :"" }>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu} className={location.pathname === "/about"? "active" :"" }>About</Link>
          </li>
          <li>
            <Link onClick={closeMenu} to="/notes" className={location.pathname === "/notes"? "active" :"" }>Notes</Link>
          </li>
          <li>
            {findJwt? <Link onClick={closeMenu} to="/myaccount" className={location.pathname === "/myaccount"? "active": ""} /> : <Link onClick={closeMenu} to="/login" className={location.pathname === "/login"? "active" :"" }>Login</Link>
}
          </li>
        </ul>
      </div>
    </>
  );
}
