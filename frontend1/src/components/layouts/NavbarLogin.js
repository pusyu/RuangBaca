// NavbarLogin.js
import React from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/NavbarLoginPage.css"

const NavbarLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <nav className="navbar bg-body-tertiary navbar-custom">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src="/Logo.png" alt="Logo" width="50" height="50" className="me-2" />
          <div>
            <h5 className="mb-0">Form Kunjungan Pengunjung Ruang Baca</h5>
            <small className="text-muted">Fakultas Teknik dan Teknologi Kemaritiman</small>
          </div>
        </div>
        <a className="btn btn-primary" onClick={handleLogin}>Login</a>
      </div>
    </nav>
  );
};

export default NavbarLogin;
