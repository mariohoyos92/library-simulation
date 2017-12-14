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

// Book Handling Endpoints

app.get("/api/books", (req, res, next) => {
  app
    .get("db")
    .getAllBooks()
    .then(books => {
      res.status(200).json(books);
    })
    .catch(console.log);
});

app.get("/api/books/:id", (req, res, next) => {
  app
    .get("db")
    .getBookDetails([req.params.id])
    .then(bookDetails => {
      res.status(200).json(bookDetails[0]);
    })
    .catch(console.log);
});

app.delete("/api/book/:id", (req, res, next) => {
  app
    .get("db")
    .deleteBookFromDb([req.params.id])
    .then(response => {
      res.status(200).json("book is deleted");
    })
    .catch(console.log);
});

app.post("/api/books", (req, res, next) => {
  app
    .get("db")
    .addNewBook([
      req.body.title,
      req.body.author,
      req.body.genre,
      req.body.inStock,
      req.body.description,
      req.body.img
    ])
    .then(resp => res.status(200).json("book added!"))
    .catch(console.log);
});

app.put("/api/books", (req, res, next) => {
  app
    .get("db")
    .editBook([
      req.body.title,
      req.body.author,
      req.body.genre,
      req.body.description,
      req.body.img,
      req.body.id
    ])
    .then(response => {
      res.status(200).json("Book edited");
    })
    .catch(console.log);
});

// Cart Endpoints

app.post("/api/checkout", (req, res, next) => {
  console.log(req.session, req.body);
});

app.get("/api/cart", (req, res, next) => {
  if (req.session.cart) {
    res.status(200).json(req.session.cart);
  } else {
    res.status(200).json([]);
  }
});

app.post("/api/cart", (req, res, next) => {
  if (req.session.cart) {
    app
      .get("db")
      .getBookDetails([req.body.id])
      .then(response => {
        req.session.cart.push(response[0]);
        res.status(200).send(req.session.cart);
      })
      .catch(console.log);
  } else {
    app
      .get("db")
      .getBookDetails([req.body.id])
      .then(response => {
        req.session.cart = response;
        res.status(200).send(req.session.cart);
      })
      .catch(console.log);
  }
});

app.delete("/api/cart/:id", (req, res, next) => {
  req.session.cart.splice(req.params.id, 1);

  res.status(200).json(req.session.cart);
});

// AUTHENTICATION AND LOGOUT ENDPOINTS

app.get("/api/logstatus", (req, res, next) => {
  res.status(200).json(req.session);
});

app.post("/api/auth/register", (req, res, next) => {
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
  app
    .get("db")
    .checkLogin([req.body.username, req.body.password])
    .then(response => {
      req.session.username = response[0].username;
      req.session.ident = response[0].id;
      req.session.loggedin = true;
      res.status(200).json(req.session);
    })
    .catch(res.status(500));
});

app.post("/api/auth/logout", (req, res, next) => {
  req.session.destroy();
  res.status(200).json("logged out");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
