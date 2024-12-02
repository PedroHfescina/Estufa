import React, { useState } from "react";
import "boxicons";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Hook para controlar o estado de abertura da sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo_details">
        <i className="bx bxl-audible icon"></i>
        <div className="logo_name">DryControl</div>
        <i
          className={`bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"}`}
          id="btn"
          onClick={toggleSidebar}
        ></i>
      </div>
      <ul className="nav-list">
        <li>
          <i className="bx bx-search" onClick={toggleSidebar}></i>
          <input type="text" placeholder="Search..." />
          <span className="tooltip">Search</span>
        </li>

        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <li>
            <a href="#">
              <i className="bx bx-home"></i>
              <span className="link_name">Home</span>
            </a>
            <span className="tooltip">Home</span>
          </li>
        </NavLink>

        <NavLink to="/Dashboard" style={{ textDecoration: 'none' }}>
          <li>
            <a href="#">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard/Estufa</span>
            </a>
            <span className="tooltip">Dashboard</span>
          </li>
        </NavLink>



        <NavLink to='/Config' style={{ textDecoration: 'none' }}>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="link_name">Settings</span>
            </a>
            <span className="tooltip">Settings</span>
          </li>
        </NavLink>

        <li className="profile">
          <div className="profile_details">
            <div className="profile_content">
              <div className="designation">Grupo 6</div>
              <i className="bx bx-log-out" id="log_out"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
