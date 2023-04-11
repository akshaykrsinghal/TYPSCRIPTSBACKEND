const express = require("express");
const app = express();
const db = require("./src/models");
const cors = require('cors');

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extends:false}));

function authentication(req, res, next) {
  const authheader = req.headers.authorization;
  //console.log(req.headers);

  if (!authheader) {
      let err = new Error('You are not authenticated!');
      err.status = 401;
      return next("not found.")
  }

  const auth = authheader.split(' ');

  const user = auth[0];
  const pass = auth[1];

  if (user == 'admin' && pass == 'password') {

      // If Authorized user
      next();
  } else {
      let err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
  }

}

//app.use(authentication);

app.use('/images',express.static('./resources/static/assets/uploads'))

const initRoutes = require("./src/routes/web");
const initRoutesUsers = require("./src/routes/user");

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
initRoutes(app);
initRoutesUsers(app);

// db.sequelize.sync();
db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

let port = 3001;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
