const express = require('express');
const companiesRouter = express.Router();

const auth = require('../middleware/auth');

const controller = require('../controllers/companies.controller');

companiesRouter.post('/', controller.createOneRequest);
companiesRouter.get('/', auth, controller.readAllRequest);

companiesRouter.get('/:id', auth, controller.readOneRequest);
companiesRouter.put('/:id', auth, controller.updateOneRequest);
companiesRouter.delete('/:id', auth, controller.deleteOneRequest);

module.exports = companiesRouter;