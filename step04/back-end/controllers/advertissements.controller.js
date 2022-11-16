
// every function is ok

const { json } = require("sequelize");
const advertissementsModel = require("../models/advertissements");
const companiesModel = require("../models/companies");

// //////////////////////////create request////////////////////////////////
// const advertissementsModel = require('../models/people');
exports.createOneRequest = async (req, res) => {
  const jobName = req.body.jobName;
  // check if database already contains this name
  const foundUser = await advertissementsModel.findOne({ where: { jobName } });
  if (!foundUser || foundUser.length == 0) {
    const user = new advertissementsModel(req.body);
    const response = await user.save();
    res.status(201).json(response);
  } else {
    res.status(409).json({ message: "User already exists!" });
  }
};

// //////////////////////////read request////////////////////////////////

exports.readOneRequest = async (req, res) => {
  // Best request is GET, we can get the ID from the request
  // parameters.
  const { id } = req.params;

  // attempt to retrieve user
  const foundUser = await advertissementsModel.findOne({
    where: { id: id },
    include: [{ model: companiesModel }]

    // attributes: ["firstName"]
  });

  // return 404 if no user found, return user otherwise.
  if (!foundUser || foundUser.length == 0) {
    res.status(404).json({ message: "User not found!" });
  } else {
    res.status(302).json(foundUser);
  }
};
exports.readAllRequest = async (req, res) => {
  // Best request is GET, we can get the ID from the request
  // parameters.

  // attempt to retrieve user
  const foundUser = await advertissementsModel.findAll({
    include: [{ model: companiesModel }]
  });
  console.log(foundUser);
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
  const foundUser = await advertissementsModel.findOne({
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
  const foundUser = await advertissementsModel.findOne({ id: id });
  if (foundUser || foundUser.length == 0) {
    const response = await advertissementsModel.destroy({ where: { id: id } });
    res.status(202).json(response);
  } else {
    res.status(404).json({ message: `User not found...` });
  }
};
