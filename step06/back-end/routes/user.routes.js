const express = require('express');
const userRouter = express.Router();

const auth = require('../middleware/auth');

const controller = require('../controllers/user.controller');

userRouter.post('/',controller.createOneRequest);
userRouter.get('/',auth ,controller.readAllRequest);
userRouter.post('/login',controller.login);
userRouter.get('/:id',auth , controller.readOneRequest);
userRouter.put('/:id',auth , controller.updateOneRequest);
userRouter.delete('/:id',auth , controller.deleteOneRequest);

module.exports = userRouter;