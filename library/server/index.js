require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");

// CONFIG VARIABLES

// IMPORT CONTROLLERS

const {
  getBooks,
  getBookDetails,
  deleteBook,
  createBook,
  editBook
} = require("./controllers/bookController");
const {
  getCart,
  addToCart,
  removeFromCart,
  checkOut
} = require("./controllers/cartController");
const {
  getLogStatus,
  register,
  login,
  logout
} = require("./controllers/authController");
const { getShelf, removeFromShelf } = require("./controllers/shelfController");

//-----------------------------------------------------------------------------Begin Server----------------------------------------------

const app = express();

app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

massive(process.env.DATABASE_URL)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(json());
app.use(cors());

// Book Handling Endpoints

app.get("/api/books", getBooks);
app.get("/api/books/:id", getBookDetails);
app.delete("/api/book/:id", deleteBook);
app.post("/api/books", createBook);
app.put("/api/books", editBook);

// Cart Endpoints

app.post("/api/checkout", checkOut);
app.get("/api/cart", getCart);
app.post("/api/cart", addToCart);
app.delete("/api/cart/:id", removeFromCart);

// AUTHENTICATION AND LOGOUT ENDPOINTS

app.get("/api/logstatus", getLogStatus);
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.post("/api/auth/logout", logout);

// Shelf Endpoints

app.get("/api/shelf", getShelf);
app.post("/api/shelf", removeFromShelf);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
