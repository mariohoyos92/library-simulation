module.exports = {
  checkOut: (req, res, next) => {
    req.body.idArray.forEach(bookId => {
      req.session.cart = [];
      req.app
        .get("db")
        .addBookToShelf([req.session.ident, bookId])
        .then(response => {})
        .catch(console.log);
    });
    res.status(200).json("success");
  },
  getCart: (req, res, next) => {
    if (req.session.cart) {
      res.status(200).json(req.session.cart);
    } else {
      res.status(200).json([]);
    }
  },
  addToCart: (req, res, next) => {
    if (req.session.cart) {
      req.app
        .get("db")
        .getBookDetails([req.body.id])
        .then(response => {
          req.session.cart.push(response[0]);
          res.status(200).send(req.session.cart);
        })
        .catch(console.log);
    } else {
      req.app
        .get("db")
        .getBookDetails([req.body.id])
        .then(response => {
          req.session.cart = response;
          res.status(200).send(req.session.cart);
        })
        .catch(console.log);
    }
  },
  removeFromCart: (req, res, next) => {
    req.session.cart.splice(req.params.id, 1);
    res.status(200).json(req.session.cart);
  }
};
