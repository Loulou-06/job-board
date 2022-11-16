const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');
const companies = require('./companies')
const advertisements = sequelize.define('advertisements', {


  // const Sequelize = require('sequelize');
  // module.exports = function(sequelize, DataTypes) {
  //   return sequelize.define('advertisements', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  jobName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  typeContract: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  skill: {
    type: DataTypes.JSON,
    allowNull: false
  },
  companies_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'companies',
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'advertisements',
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
      name: "companies_ID",
      using: "BTREE",
      fields: [
        { name: "companies_ID" },
      ]
    },
  ]
});
// };
advertisements.belongsTo(companies, { foreignKey: 'companies_ID' });
companies.hasMany(advertisements, { foreignKey: 'id' });

module.exports = advertisements;
