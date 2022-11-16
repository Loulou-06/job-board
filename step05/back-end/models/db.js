const Sequelize = require('sequelize');
const sequelize = new Sequelize('job_board_epitech', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})
sequelize.sync({ alter: true });
module.exports = { sequelize };