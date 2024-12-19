import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import "../../../styles/Dashboards/Dashboard.css";

const Dashboard = () => {
  const [totalPengunjung, setTotalPengunjung] = useState(0);
  const [pengunjungBulanan, setPengunjungBulanan] = useState(0);
  const [pengunjungHarian, setPengunjungHarian] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total pengunjung
        const pengunjungResponse = await fetch("http://localhost:3200/api/pengunjung/count");
        if (!pengunjungResponse.ok) throw new Error("Gagal mengambil data total pengunjung");
        const pengunjungData = await pengunjungResponse.json();
        setTotalPengunjung(pengunjungData.count || 0);

        // Fetch pengunjung bulanan
        const bulananResponse = await fetch("http://localhost:3200/api/kunjungan/bulanan");
        if (!bulananResponse.ok) throw new Error("Gagal mengambil data pengunjung bulanan");
        const bulananData = await bulananResponse.json();
        setPengunjungBulanan(bulananData.count || 0);

        // Fetch pengunjung harian
        const harianResponse = await fetch("http://localhost:3200/api/kunjungan/harian");
        if (!harianResponse.ok) throw new Error("Gagal mengambil data pengunjung harian");
        const harianData = await harianResponse.json();
        setPengunjungHarian(harianData.count || 0);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const downloadExcel = async (endpoint, filename, excludeKeys = []) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Gagal mengambil data untuk diunduh");
      const data = await response.json();

      // Filter out excluded keys and rename relevant keys
      const filteredData = data.data.map((item) => {
        const newItem = { ...item };
        excludeKeys.forEach((key) => delete newItem[key]);
        if (newItem.createdAt) {
          newItem.Terdaftar = formatDate(newItem.createdAt);
          delete newItem.createdAt;
        }
        if (newItem.updated_at) { // Handle "updated_at" explicitly
          newItem.Berkunjung = formatDate(newItem.updated_at);
          delete newItem.updated_at;
        }
        return newItem;
      });

      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, `${filename}.xlsx`);
    } catch (err) {
      alert("Terjadi kesalahan saat mengunduh data: " + err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container fluid className="p-5">
      <h1 className="mb-4">Dashboard</h1>

      <Row className="mb-5">
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <h3>Total Pengunjung</h3>
              <h2>{totalPengunjung}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <h3>Pengunjung Bulanan</h3>
              <h2>{pengunjungBulanan}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="stat-card">
            <Card.Body>
              <h3>Pengunjung Harian</h3>
              <h2>{pengunjungHarian}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Button
            variant="primary"
            onClick={() => downloadExcel("http://localhost:3200/api/pengunjung", "Data_Anggota", ["id", "updatedAt"])}
          >
            Download Data Anggota
          </Button>
          <Button
            variant="secondary"
            className="ms-3"
            onClick={() => downloadExcel("http://localhost:3200/api/kunjungan", "Data_Kunjungan", ["id", "Pengunjung", "created_at"])}
          >
            Download Data Kunjungan
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
