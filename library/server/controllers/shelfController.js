module.exports = {
  getShelf: (req, res, next) => {
    req.app
      .get("db")
      .getShelfForUser([req.session.ident])
      .then(books => {
        res.status(200).json(books);
      })
      .catch(console.log);
  },
  removeFromShelf: (req, res, next) => {
    req.app
      .get("db")
      .removeBookFromShelf([req.session.ident, req.body.id])
      .then(books => {
        res.status(200).json(books);
      })
      .catch(console.log);
  }
};
