const express = require('express');
const advertissementsRouter = express.Router();

const auth = require('../middleware/auth');

const controller = require('../controllers/advertissements.controller.js');

advertissementsRouter.post('/',auth , controller.createOneRequest);
advertissementsRouter.get('/', controller.readAllRequest);

advertissementsRouter.get('/:id', controller.readOneRequest);
advertissementsRouter.put('/:id',auth , controller.updateOneRequest);
advertissementsRouter.delete('/:id',auth , controller.deleteOneRequest);

module.exports = advertissementsRouter;