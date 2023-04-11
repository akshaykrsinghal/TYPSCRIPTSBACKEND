const dbConfig = require("../config/db.config.js");
require('dotenv').config();

const Sequelize = require("sequelize");
//console.log(process.env)
const sequelize = new Sequelize(process.env.REACT_APP_USER,process.env.REACT_APP_DB,process.env.REACT_APP_PASSWORD,{
  host:process.env.REACT_APP_HOST,
  logging:false,
  dialect:'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.images = require("./image.model.js")(sequelize, Sequelize);
db.users = require("./user.js")(sequelize, Sequelize);

module.exports = db;
