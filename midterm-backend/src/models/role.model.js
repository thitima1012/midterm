const {DataTypes, DataTypes} =require("sequelize")
const sequelize = require("./db")

const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
module.exports= Role;