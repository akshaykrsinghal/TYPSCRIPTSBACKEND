module.exports = {
  HOST: process.env.REACT_APP_HOST,
  USER: process.env.REACT_APP_USER,
  PASSWORD:process.env.REACT_APP_PASSWORD,
  DB: process.env.REACT_APP_DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};