const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const KunjunganModel = require('../Models/KunjunganModel');
const PengunjungModel = require('../Models/PengunjungModel');

// GET / - Menampilkan semua data kunjungan
router.get('/', async (req, res) => {
  try {
    const kunjungan = await KunjunganModel.findAll({
      include: [
        {
          model: PengunjungModel,
          attributes: ['nama_lengkap', 'jenis_kelamin', 'email_umrah'], // Ambil detail dari pengunjung
        },
      ],
    });

    res.status(200).json({
      data: kunjungan,
      metadata: 'Data kunjungan berhasil diambil.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data kunjungan.' });
  }
});

// GET /bulanan - Menampilkan jumlah kunjungan bulanan
router.get('/bulanan', async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const count = await KunjunganModel.count({
      where: {
        created_at: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    res.status(200).json({
      count,
      metadata: 'Jumlah kunjungan bulanan berhasil diambil.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil jumlah kunjungan bulanan.' });
  }
});

// GET /harian - Menampilkan jumlah kunjungan harian
router.get('/harian', async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const count = await KunjunganModel.count({
      where: {
        created_at: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    res.status(200).json({
      count,
      metadata: 'Jumlah kunjungan harian berhasil diambil.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil jumlah kunjungan harian.' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Cari data kunjungan berdasarkan ID
    const kunjungan = await KunjunganModel.findOne({ where: { id } });

    if (!kunjungan) {
      return res.status(404).json({
        message: 'Data kunjungan tidak ditemukan.',
      });
    }

    // Hapus data kunjungan
    await kunjungan.destroy();

    res.status(200).json({
      message: 'Data kunjungan berhasil dihapus.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus data kunjungan.' });
  }
});

// POST /kunjungan - Menambahkan data kunjungan
router.post('/masuk', async (req, res) => {
  const { nim, keperluan } = req.body;

  try {
    // Cek apakah nim ada di database PengunjungModel
    const pengunjung = await PengunjungModel.findOne({ where: { nim } });

    if (!pengunjung) {
      return res.status(400).json({
        message: 'NIM tidak ditemukan. Data kunjungan tidak dapat ditambahkan.',
      });
    }

    // Menambahkan data kunjungan
    const kunjungan = await KunjunganModel.create({
      nim,
      keperluan,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json({
      data: kunjungan,
      metadata: 'Data kunjungan berhasil ditambahkan.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan data kunjungan.' });
  }
});

module.exports = router;
