import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const LeftMenu = () => {
  const [nav, setNav] = useState(true);

  let history = useHistory();

  // useEffect(() => {
  //   if (localStorage.usertoken) {
  //     const token = localStorage.usertoken;
  //     const decoded = jwt_decode(token);

  //     if (decoded.exp < (new Date().getTime() + 1) / 1000) {
  //       localStorage.removeItem("usertoken");
  //       return history.push("/");
  //     }
  //   } else {
  //     return history.push("/");
  //   }
  // }, [history]);

  const logout = () => {
    localStorage.removeItem("usertoken");
    return history.push("/");
  };

  const nav_toggle = () => {
    setNav(!nav);
  };

  return (
    <div id="left-menu" className={nav ? "nav-active" : "nav-inactive"}>
      <div className="left-menu-container">
        <div className="h-100 pt-2 pl-2">
          <ul className="list-unstyled left-menu pl-4 pr-3">
            <li className="pb-2 pt-1 text-right">
              <FontAwesomeIcon icon={faTimes} onClick={nav_toggle} />
            </li>
            <li className="pb-2 pt-1">SUMMARY</li>
            <ul className="px-0">
              <li>
                <Link to={{ pathname: "/summary_outdoor" }}>OUTDOOR UNIT</Link>
              </li>
              <li>
                <Link to={{ pathname: "/summary_indoor" }}>INDOOR UNIT</Link>
              </li>
            </ul>
            <li className="py-2 pt-1">PRODUCTION STATUS</li>
            <ul className="px-0">
              <li>
                <Link to={{ pathname: "/production_outdoor_line_1" }}>
                  OUTDOOR UNIT LINE 1
                </Link>
              </li>
              <li>
                <Link to={{ pathname: "/production_outdoor_line_2" }}>
                  OUTDOOR UNIT LINE 2
                </Link>
              </li>
              <li>
                <Link to={{ pathname: "/production_indoor_line_1" }}>
                  INDOOR UNIT LINE 1
                </Link>
              </li>
              <li>
                <Link to={{ pathname: "/production_indoor_line_2" }}>
                  INDOOR UNIT LINE 2
                </Link>
              </li>
            </ul>
            <li className="py-2 pt-1">SETTING</li>
            <ul className="px-0">
              <li>
                <Link to={{ pathname: "/user_setting" }}>USER SETTING</Link>
              </li>
              <li>
                <Link to={{ pathname: "/master_data" }}>Master Data</Link>
              </li>
            </ul>
            <li className="py-2 pt-1">ACCOUNT</li>
            <ul className="px-0">
              <li>
                <span onClick={logout}>LOGOUT</span>
              </li>
            </ul>
          </ul>
          <p className="pl-2 pr-3 bar-nav">
            <FontAwesomeIcon icon={faBars} onClick={nav_toggle} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
