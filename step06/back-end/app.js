const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const userRouter = require('./routes/user.routes');
app.use('/api/user', userRouter);

const companiesRouter = require('./routes/companies.route');
app.use('/api/companies', companiesRouter);

const advertissementsRouter = require('./routes/advertissements.route');
app.use('/api/advertissements', advertissementsRouter);

const jobinfoRouter = require('./routes/jobinfo.route');
app.use('/api/jobinfo', jobinfoRouter);

module.exports = app;


