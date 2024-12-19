const { Model, DataTypes  } = require('sequelize')
const sequelize = require('../db.config')

class Admin extends Model {}

Admin.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Admin"
})

module.exports = Admin