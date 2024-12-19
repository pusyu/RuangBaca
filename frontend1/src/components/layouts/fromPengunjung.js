import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/frompengunjungPage.css";

const FormPengunjung = () => {
  const [formData, setFormData] = useState({ nim: "", keperluan: "" });
  const navigate = useNavigate();

  const handleInputChange = ({ target: { id, value } }) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nim || !formData.keperluan) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Semua field harus diisi!" });
      return;
    }

    try {
      const response = await fetch("http://localhost:3200/api/kunjungan/masuk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({ icon: "success", title: "Berhasil!", text: "Data berhasil dikirim!" });
        setFormData({ nim: "", keperluan: "" });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: Array.isArray(data.message) ? data.message.join("\n") : data.message || "Gagal mengirim data!",
        });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error!", text: "Terjadi kesalahan saat menghubungi server." });
    }
  };

  return (
    <div className="custom-peng-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nim" className="form-label">NIM</label>
          <input type="text" className="form-control" id="nim" value={formData.nim} onChange={handleInputChange} placeholder="Masukkan NIM" />
        </div>
        <div className="mb-3">
          <label htmlFor="keperluan" className="form-label">Keperluan</label>
          <input type="text" className="form-control" id="keperluan" value={formData.keperluan} onChange={handleInputChange} placeholder="Masukkan Keperluan" />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Kirim</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/register")}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default FormPengunjung;