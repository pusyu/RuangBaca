const bcrypt = require('bcrypt')
const adminModel = require('../Models/AdminModel')

const passwordCheck = async ( username, password) => {
  const adminData = await adminModel.findOne({where: {username: username}})
  const compare = await bcrypt.compare(password, adminData.password)
  return {adminData, compare}
}

module.exports = passwordCheck