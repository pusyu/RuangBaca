import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/Dashboards/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Profil</h2>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/datakunjungan">Data Kunjungan</Link>
        </li>
        <li>
          <Link to="/dashboard/dataanggota">Data Anggota</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
