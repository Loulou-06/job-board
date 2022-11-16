const express = require('express');
const jobinfoRouter = express.Router();

const auth = require('../middleware/auth');

const controller = require('../controllers/jobinfo.controller');

jobinfoRouter.post('/', controller.createOneRequest);
jobinfoRouter.get('/', auth, controller.readAllRequest);
jobinfoRouter.get('/all/:id', auth, controller.readAllRequestByCompany);
jobinfoRouter.get('/:id', auth, controller.readOneRequest);
jobinfoRouter.put('/:id', auth, controller.updateOneRequest);
jobinfoRouter.delete('/:id', auth, controller.deleteOneRequest);

module.exports = jobinfoRouter;