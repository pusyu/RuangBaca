import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/registrasiPengunjung.css";

const RegistrasiPengunjung = () => {
  const [formData, setFormData] = useState({
    nim: "",
    nama_lengkap: "",
    jenis_kelamin: "",
    email_umrah: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ target: { id, value } }) => {
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data yang dikirim:", formData); // Debugging: Memastikan data yang dikirim benar
      
      await axios.post("http://localhost:3200/api/pengunjung/registers", formData);
      Swal.fire({
        icon: "success",
        title: "Registrasi berhasil!",
        text: "Data Anda telah berhasil disimpan.",
      });

      // Reset form data
      setFormData({ nim: "", nama_lengkap: "", jenis_kelamin: "", email_umrah: "" });

      // Arahkan pengguna kembali ke halaman utama
      navigate("/");
    } catch (error) {
      console.error("Error saat registrasi:", error.response || error.message);

      Swal.fire({
        icon: "error",
        title: "Registrasi gagal",
        text: error.response?.data?.error || "Terjadi kesalahan. Coba lagi.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form-container">
      <div className="mb-3">
        <label htmlFor="nim" className="form-label">NIM</label>
        <input 
          type="text" 
          className="form-control" 
          id="nim" 
          value={formData.nim} 
          onChange={handleChange} 
          placeholder="Masukkan NIM" 
          required 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="nama_lengkap" className="form-label">Nama Lengkap</label>
        <input 
          type="text" 
          className="form-control" 
          id="nama_lengkap" 
          value={formData.nama_lengkap} 
          onChange={handleChange} 
          placeholder="Masukkan Nama Lengkap" 
          required 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="jenis_kelamin" className="form-label">Jenis Kelamin</label>
        <select 
          className="form-control" 
          id="jenis_kelamin" 
          value={formData.jenis_kelamin} 
          onChange={handleChange} 
          required
        >
          <option value="">Pilih Jenis Kelamin</option>
          <option value="laki-laki">Laki-laki</option>
          <option value="perempuan">Perempuan</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="email_umrah" className="form-label">Email UMRAH</label>
        <input 
          type="email" 
          className="form-control" 
          id="email_umrah" 
          value={formData.email_umrah} 
          onChange={handleChange} 
          placeholder="Masukkan email (contoh: nama@student.umrah.ac.id)" 
          required 
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">Daftar</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Kembali</button>
      </div>
    </form>
  );
};

export default RegistrasiPengunjung;
