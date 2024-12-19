const { Model, DataTypes  } = require('sequelize')
const sequelize = require('../db.config')

class Pengunjung extends Model {}

Pengunjung.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nim: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  nama_lengkap: {
    type:DataTypes.STRING,
    allowNull: true
  },
  jenis_kelamin: {
    type:DataTypes.ENUM,
    values: ['laki-laki', 'perempuan']
  },
  email_umrah: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  sequelize,
  modelName: "Pengunjung"
})

module.exports = Pengunjung