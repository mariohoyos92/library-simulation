module.exports = {
  getBooks: (req, res, next) => {
    req.app
      .get("db")
      .getAllBooks()
      .then(books => {
        res.status(200).json(books);
      })
      .catch(console.log);
  },
  getBookDetails: (req, res, next) => {
    req.app
      .get("db")
      .getBookDetails([req.params.id])
      .then(bookDetails => {
        res.status(200).json(bookDetails[0]);
      })
      .catch(console.log);
  },
  deleteBook: (req, res, next) => {
    req.app
      .get("db")
      .deleteBookFromDb([req.params.id])
      .then(response => {
        res.status(200).json("book is deleted");
      })
      .catch(console.log);
  },
  createBook: (req, res, next) => {
    req.app
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
  },
  editBook: (req, res, next) => {
    req.app
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
  }
};
