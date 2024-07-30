// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css"; // CSS 파일 임포트

const Navbar = ({ isAuthenticated, logout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/map">지도</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button onClick={logout}>로그 아웃</button>
          </li>
        ) : (
          <li>
            <Link to="http://localhost:5000/logout">로그아웃</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
