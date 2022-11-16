
// every function is ok


const { json } = require("sequelize");
const jobInfoModel = require("../models/jobinfo");
const advertissementsModel = require("../models/advertissements");
const companiesModel = require("../models/companies");
const peopleModel = require("../models/people");
// //////////////////////////create request////////////////////////////////
// const jobInfoModel = require('../models/people');


// function is ok
exports.createOneRequest = async (req, res) => {
  // const id = req.body.id;
  // // check if database already contains this name
  // const foundUser = await jobInfoModel.findOne({ where: { id } });
  // if (!foundUser || foundUser.length == 0) {
  const user = new jobInfoModel(req.body);
  const response = await user.save();
  res.status(201).json(response);
  // } else {
  //   res.status(409).json({ message: "JobInfo already exists!" });
  // }
};

// function is ok 
// //////////////////////////read request////////////////////////////////
exports.readOneRequest = async (req, res) => {
  // Best request is GET, we can get the ID from the request
  // parameters.
  const { id } = req.params;

  // attempt to retrieve user
  const foundUser = await jobInfoModel.findOne({
    where: { id: id },
    include: [{ model: companiesModel }, { model: advertissementsModel }, { model: peopleModel }],

    // attributes: ["firstName"]
  });

  // return 404 if no user found, return user otherwise.
  if (!foundUser || foundUser.length == 0) {
    res.status(404).json({ message: "User not found!" });
  } else {
    res.status(302).json(foundUser);
  }
};

// function is ok
exports.readAllRequest = async (req, res) => {
  // Best request is GET, we can get the ID from the request
  // parameters.

  // attempt to retrieve user
  const foundUser = await jobInfoModel.findAll({
    include: [{ model: companiesModel }, { model: advertissementsModel }, { model: peopleModel }],

  });
  // return 404 if no user found, return user otherwise.
  if (!foundUser || foundUser.length == 0) {
    res.status(404).json({ message: "User not found!" });
  } else {
    res.status(302).json(foundUser);
  }
};

exports.readAllRequestByCompany = async (req, res) => {
  // Best request is GET, we can get the ID from the request
  // parameters.
  const { id } = req.params
  // attempt to retrieve user
  const foundUser = await jobInfoModel.findAll({
    where: { companies_ID: id },
    include: [{ model: companiesModel }, { model: advertissementsModel }, { model: peopleModel }],

  });
  // return 404 if no user found, return user otherwise.
  if (!foundUser || foundUser.length == 0) {
    res.status(404).json({ message: "User not found!" });
  } else {
    res.status(302).json(foundUser);
  }
};

// //////////////////////////update request////////////////////////////////

// function is ok
exports.updateOneRequest = async (req, res) => {
  const { id } = req.params;
  const newObject = { ...req.body };
  const foundUser = await jobInfoModel.findOne({
    where: { id: id },
  });

  if (foundUser || foundUser.length == 0) {
    const response = await foundUser.update({ ...newObject });
    res.status(301).json(response);
  } else {
    res.status(404).json({ message: `User not found...` });
  }
};

// //////////////////////////delete request////////////////////////////////

// function is ok
exports.deleteOneRequest = async (req, res) => {
  const { id } = req.params;
  const foundUser = await jobInfoModel.findOne({ id: id });
  if (foundUser || foundUser.length == 0) {
    const response = await jobInfoModel.destroy({ where: { id: id } });
    res.status(202).json(response);
  } else {
    res.status(404).json({ message: `User not found...` });
  }
};
