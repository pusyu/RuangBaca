const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Pengunjung = require('./PengunjungModel'); // Import PengunjungModel

class Kunjungan extends Model {}

Kunjungan.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nim: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Pengunjung, // Nama model yang dirujuk
      key: 'nim',        // Kolom yang menjadi referensi
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  keperluan: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Kunjungan',
  tableName: 'kunjungan', // Nama tabel di database
  timestamps: false, // Anda mengelola sendiri `created_at` dan `updated_at`
});

// Relasi dengan Pengunjung
Kunjungan.belongsTo(Pengunjung, { foreignKey: 'nim', targetKey: 'nim' });

module.exports = Kunjungan;
