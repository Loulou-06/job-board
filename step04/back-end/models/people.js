const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');
const UserModel = sequelize.define('people', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tel: {
    type: DataTypes.INTEGER(15),
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  companies_ID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'companies',
      key: 'id'
    }
  }
}, {
  tableName: 'people',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    }, {
      name: "companies_ID",
      using: "BTREE",
      fields: [
        { name: "companies_ID" },
      ]
    }
  ]
});
module.exports = UserModel;
