const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
console.log(process.env)
const sequelize = new Sequelize(process.env.React_APP_DB,process.env.REACT_APP_USER,process.env.PASSWORD,{
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
