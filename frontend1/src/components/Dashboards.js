import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import NavbarLogout from "./layouts/Dashboards/NavbarLogout";
import Sidebar from "./layouts/Dashboards/Sidebar";
import Dashboard from "./layouts/Dashboards/DashboardLayouts";
import Datakunjungan from "./layouts/Dashboards/DataKunjungan";
import DataAnggota from "./layouts/Dashboards/DataAnggota";
import "../styles/Dashboards/NavbarLogoutPage.css";

const Dashboards = () => (
  <Container fluid className="p-0 bg-my">
    <NavbarLogout />
    <main className="d-flex">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/datakunjungan" element={<Datakunjungan />} />
          <Route path="/dataanggota" element={<DataAnggota />} />
        </Routes>
      </div>
    </main>
  </Container>
);

export default Dashboards;