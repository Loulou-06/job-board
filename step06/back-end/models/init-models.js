var DataTypes = require("sequelize").DataTypes;
var _advertisements = require("./advertissements");
var _companies = require("./companies");
var _jobinfo = require("./jobinfo");
var _people = require("./people");

function initModels(sequelize) {
  var advertisements = _advertisements(sequelize, DataTypes);
  var companies = _companies(sequelize, DataTypes);
  var jobinfo = _jobinfo(sequelize, DataTypes);
  var people = _people(sequelize, DataTypes);

  jobinfo.belongsTo(advertisements, { as: "advertisement", foreignKey: "advertisements_ID" });
  advertisements.hasMany(jobinfo, { as: "jobinfos", foreignKey: "advertisements_ID" });
  advertisements.belongsTo(companies, { as: "company", foreignKey: "companies_ID" });
  companies.hasMany(advertisements, { as: "advertisements", foreignKey: "companies_ID" });
  jobinfo.belongsTo(companies, { as: "company", foreignKey: "companies_ID" });
  // companies.hasMany(jobinfo, { as: "jobinfos", foreignKey: "companies_ID"});
  companies.belongsTo(people, { as: "person", foreignKey: "people_ID" });
  people.hasMany(companies, { as: "companies", foreignKey: "people_ID" });
  jobinfo.belongsTo(people, { as: "person", foreignKey: "people_ID" });
  people.hasMany(jobinfo, { as: "jobinfos", foreignKey: "people_ID" });

  people.belongsTo(companies, { as: "person", foreignKey: "companies_ID" });
  companies.hasMany(people, { as: "companies", foreignKey: "companies_ID" });

  return {
    advertisements,
    companies,
    jobinfo,
    people,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
