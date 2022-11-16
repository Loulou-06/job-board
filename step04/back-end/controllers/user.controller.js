// every is ok

const { json } = require("sequelize");
const UserModel = require("../models/people");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// //////////////////////////create request////////////////////////////////
// const UserModel = require('../models/people');

exports.createOneRequest = async (req, res) => {
  const mail = req.body.mail;
  // check if database already contains this name
  const foundUser = await UserModel.findOne({ where: { mail } });
  console.log(foundUser);
  if (!foundUser || foundUser.length == 0) {
    let body = req.body;

    await bcrypt
      .hash(req.body.password, 10)

      .then((hash) => {
        body.password = hash;
      });
    const user = new UserModel(body);
    const response = await user.save();
    res.status(201).json({ response });
  } else {
    res.status(409).json({ message: "User already exists!" });
  }
};

exports.login = (req, res, next) => {
  UserModel.findOne({ where: { mail: req.body.mail } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// //////////////////////////read request////////////////////////////////
exports.readOneRequest = async (req, res) => {
  // Best request is GET, we can get the ID from the request
  // parameters.
  const { id } = req.params;

  // attempt to retrieve user
  const foundUser = await UserModel.findOne({
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
  const foundUser = await UserModel.findAll();
  console.log(foundUser);
  // return 404 if no user found, return user otherwise.
  if (!foundUser || foundUser.length == 0) {
    res.status(404).json({ message: "User not found!" });
  } else {
    res.status(302).json(foundUser);
  }
};

// //////////////////////////update request////////////////////////////////

exports.updateOneRequest = async (req, res) => {
  const { id } = req.params;
  const foundUser = await UserModel.findOne({
    where: { id: id },
  });

  if (foundUser || foundUser.length == 0) {
    let body = req.body;
    await bcrypt
      .hash(req.body.password, 10)

      .then((hash) => {
        body.password = hash;
      });
    const newObject = { ...body };
    const response = await foundUser.update({ ...newObject });
    res.status(301).json(response);
  } else {
    res.status(404).json({ message: `User not found...` });
  }
};

// //////////////////////////delete request////////////////////////////////

exports.deleteOneRequest = async (req, res) => {
  const { id } = req.params;
  const foundUser = await UserModel.findOne({ id: id });
  if (foundUser || foundUser.length == 0) {
    const response = await UserModel.destroy({ where: { id: id } });
    res.status(202).json(response);
  } else {
    res.status(404).json({ message: `User not found...` });
  }
};
