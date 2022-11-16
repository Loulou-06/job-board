
// every function is ok

const { json } = require("sequelize");
const companiesModel = require("../models/companies");

// //////////////////////////create request////////////////////////////////
// const companiesModel = require('../models/people');

// function is ok
exports.createOneRequest = async (req, res) => {
  const name = req.body.name;
  // check if database already contains this name
  const foundUser = await companiesModel.findOne({ where: { name } });
  if (!foundUser || foundUser.length == 0) {
    const user = new companiesModel(req.body);
    const response = await user.save();
    res.status(201).json(response);
  } else {
    res.status(409).json({ message: "Company's Name already exists!" });
  }
};

// //////////////////////////read request////////////////////////////////

// function is ok 
exports.readOneRequest = async (req, res) => {
  // Best request is GET, we can get the ID from the request
  // parameters.
  const { id } = req.params;

  // attempt to retrieve user
  const foundUser = await companiesModel.findOne({
    where: { id: id },
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
  const foundUser = await companiesModel.findAll();
  console.log(foundUser);
  // return 404 if no user found, return user otherwise.
  if (!foundUser || foundUser.length == 0) {
    res.status(404).json({ message: "User not found!" });
  } else {
    res.status(302).json(foundUser);
  }
};

// //////////////////////////update request////////////////////////////////

//  function is ok
exports.updateOneRequest = async (req, res) => {
  const { id } = req.params;
  const newObject = { ...req.body };
  const foundUser = await companiesModel.findOne({
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
  const foundUser = await companiesModel.findOne({ id: id });
  if (foundUser || foundUser.length == 0) {
    const response = await companiesModel.destroy({ where: { id: id } });
    res.status(202).json(response);
  } else {
    res.status(404).json({ message: `User not found...` });
  }
};
