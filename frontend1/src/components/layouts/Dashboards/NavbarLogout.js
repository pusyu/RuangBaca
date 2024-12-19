import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Untuk melakukan request ke backend
import "../../../styles/NavbarLoginPage.css"

const NavbarLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Mengirim permintaan logout ke backend
      const response = await axios.post('http://localhost:3200/api/admin/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        // Setelah logout sukses, arahkan ke halaman login
        navigate('/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Terjadi kesalahan saat logout.");
    }
  };

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
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default NavbarLogout;
