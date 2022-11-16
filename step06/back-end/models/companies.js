const { DataTypes } = require('sequelize');
// const { default: ModelManager } = require('sequelize/types/model-manager');
const { sequelize } = require('./db');
const companies = sequelize.define('companies', {


  // const Sequelize = require('sequelize');
  // module.exports = function(sequelize, DataTypes) {
  //   return sequelize.define('companies', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  adress: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  people_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'people',
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'companies',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    {
      name: "people_ID",
      using: "BTREE",
      fields: [
        { name: "people_ID" },
      ]
    },
  ]
});
// };

module.exports = companies;
