const express = require('express');
const router = express.Router();
const pengunjungModel = require('../Models/PengunjungModel');

// GET / - Mendapatkan semua data pengunjung
router.get('/', async (req, res) => {
  try {
    const pengunjungs = await pengunjungModel.findAll();
    res.status(200).json({
      data: pengunjungs,
      metadata: 'Data pengunjung berhasil diambil',
    });
  } catch (error) {
    console.error('Error saat mengambil data pengunjung:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data pengunjung.',
      details: error.message,
    });
  }
});

// GET /count - Menghitung total pengunjung
router.get('/count', async (req, res) => {
  try {
    const totalPengunjung = await pengunjungModel.count();
    res.status(200).json({
      count: totalPengunjung,
      metadata: 'Total pengunjung berhasil dihitung',
    });
  } catch (error) {
    console.error('Error menghitung total pengunjung:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghitung total pengunjung',
      details: error.message,
    });
  }
});

// DELETE /:id - Menghapus data pengunjung berdasarkan ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pengunjung = await pengunjungModel.findByPk(id);

    if (!pengunjung) {
      return res.status(404).json({
        message: 'Data pengunjung tidak ditemukan.',
      });
    }

    await pengunjung.destroy();
    res.status(200).json({
      message: 'Data pengunjung berhasil dihapus.',
    });
  } catch (error) {
    console.error('Error saat menghapus data pengunjung:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus data pengunjung.',
      details: error.message,
    });
  }
});

// POST /registers - Menambahkan data pengunjung baru
router.post('/registers', async (req, res) => {
  try {
    const { nim, nama_lengkap, jenis_kelamin, email_umrah } = req.body;

    if (!nim || !nama_lengkap || !jenis_kelamin || !email_umrah) {
      return res.status(400).json({ error: 'Semua field wajib diisi.' });
    }

    if (!/^\d+$/.test(nim)) {
      return res.status(400).json({ error: 'NIM harus berupa angka.' });
    }

    if (!['laki-laki', 'perempuan'].includes(jenis_kelamin)) {
      return res.status(400).json({ error: "Jenis kelamin harus 'laki-laki' atau 'perempuan'." });
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(?:student\.)?umrah\.ac\.id$/;
    if (!emailPattern.test(email_umrah)) {
      return res.status(400).json({ error: 'Email tidak valid. Gunakan email @student.umrah.ac.id atau @umrah.ac.id' });
    }

    const [existingNim, existingEmail] = await Promise.all([
      pengunjungModel.findOne({ where: { nim } }),
      pengunjungModel.findOne({ where: { email_umrah } }),
    ]);

    if (existingNim) return res.status(409).json({ error: 'NIM sudah terdaftar.' });
    if (existingEmail) return res.status(409).json({ error: 'Email sudah terdaftar.' });

    const pengunjung = await pengunjungModel.create({ nim, nama_lengkap, jenis_kelamin, email_umrah });

    res.status(201).json({ data: pengunjung, metadata: 'Pendaftaran berhasil.' });
  } catch (error) {
    console.error('Error saat menambahkan data pengunjung:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat membuat pengunjung.',
      details: error.message,
    });
  }
});

module.exports = router;
