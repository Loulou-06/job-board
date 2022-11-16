const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');
const companies = require('./companies')
const advertissements = require('./advertissements')
const people = require('./people')


const jobinfo = sequelize.define('jobinfo', {
  // const Sequelize = require('sequelize');
  // module.exports = function(sequelize, DataTypes) {
  //   return sequelize.define('jobinfo', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  advertisements_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'advertisements',
      key: 'id'
    }
  },
  people_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'people',
      key: 'id'
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'jobinfo',
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
      name: "advertisements_ID",
      using: "BTREE",
      fields: [
        { name: "advertisements_ID" },
      ]
    },
    {
      name: "companies_ID",
      using: "BTREE",
      fields: [
        { name: "companies_ID" },
      ]
    }, {
      name: "people_ID",
      using: "BTREE",
      fields: [
        { name: "people_ID" },
      ]
    }

  ]
});
jobinfo.belongsTo(companies, { foreignKey: 'companies_ID' });
companies.hasMany(jobinfo, { foreignKey: 'id' });
jobinfo.belongsTo(people, { foreignKey: 'people_ID' });
people.hasMany(jobinfo, { foreignKey: 'id' });
jobinfo.belongsTo(advertissements, { foreignKey: 'advertisements_ID' });
advertissements.hasMany(jobinfo, { foreignKey: 'id' });
// };
module.exports = jobinfo;
