module.exports = {
  getLogStatus: (req, res, next) => {
    res.status(200).json(req.session);
  },
  register: (req, res, next) => {
    req.app
      .get("db")
      .addNewUser([req.body.username, req.body.password])
      .then(response => {
        req.session.username = response[0].username;
        req.session.ident = response[0].id;
        req.session.loggedin = true;
        res.status(200).json(response[0]);
      })
      .catch(res.status(500));
  },
  login: (req, res, next) => {
    req.app
      .get("db")
      .checkLogin([req.body.username, req.body.password])
      .then(response => {
        req.session.username = response[0].username;
        req.session.ident = response[0].id;
        req.session.loggedin = true;
        res.status(200).json(req.session);
      })
      .catch(res.status(500));
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).json("logged out");
  }
};
