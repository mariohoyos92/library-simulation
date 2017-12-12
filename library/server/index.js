const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");

//CONFIG VARIABLES BELOW
const { secret, connectionString } = require("../config");

const port = 3001;

const app = express();

// app.use(express.static(`__dirname/build`));

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false
  })
);

massive(connectionString)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(json());
app.use(cors());

// AUTHENTICATION AND LOGOUT ENDPOINTS

app.post("/api/auth/register", (req, res, next) => {
  //add user to the database via username and password
  app
    .get("db")
    .addNewUser([req.body.username, req.body.password])
    .then(response => {
      req.session.username = response[0].username;
      req.session.ident = response[0].id;
      res.status(200).json(response[0]);
    })
    .catch(res.status(500));
});

app.post("/api/auth/login", (req, res, next) => {
  console.log(req.body);
  app
    .get("db")
    .checkLogin([req.body.username, req.body.password])
    .then(response => {
      console.log(response);
      req.session.username = response[0].username;
      req.session.ident = response[0].id;
      res.status(200).json(req.session);
    })
    .catch(res.status(500));
});

app.post("/api/auth/logout", (req, res, next) => {
  console.log(req);
  req.session.destroy();
  res.status(200).json("logged out");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
