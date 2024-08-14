// Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTh, FaList, FaBox } from 'react-icons/fa';
import logo from "../assets/imges/logo.png";
import './Sidebar.css';

export const Sidebar = () => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (path) => {
    setActiveMenuItem(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo" style={{"color":"white"}}><img src={logo} alt="logo" height={50} /></div>
      <ul className="sidebar-menu">
        <li className={`menu-item ${activeMenuItem === '/Home' ? 'active' : ''}`}>
          <Link to="/Home" onClick={() => handleMenuItemClick('/Home')}>
            <FaHome />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={`menu-item ${activeMenuItem === '/empList' ? 'active' : ''}`} >
          <Link to="/empList" onClick={() => handleMenuItemClick('/empList')}>
            <FaList />
            <span> Employee List </span>
          </Link>
        </li>
        {/* <li className={`menu-item ${activeMenuItem === '/empList' ? 'active' : ''}`}>
          <Link to="/empList" onClick={() => handleMenuItemClick('/empList')}>
            <FaBox />
            <span>Employee List</span>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

