const { User } = require("../models");
const { Products } = require("../models");
const passport = require("../lib/passport");

function format(user) {
  const { id, email } = user;
  return {
    id,
    email,
    accessToken: user.generateToken(),
  };
}

module.exports = {
  register: (req, res, next) => {
    User.register(req.body)
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => next(err));
  },

  login: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),

  akun: (req, res) => {
    User.authenticate(req.body).then((user) => {
      res.json(format(user));
    });
  },
  create: (req, res, next) => {
    Products.create(req.body)
      .then(() => {
        res.redirect("/dashboard");
      })
      .catch((err) => next(err));
  },
  update: (req, res) => {
    Products.update(req.body, { where: { id: req.params.id } })
      .then(() => {
        res.redirect("/dashboard");
      })
      .catch((err) => {
        res.status(422).json("Can't update");
      });
  },
  dashboard: (req, res) => {
    Products.findAll().then((a) => {
      res.render("dashboard", { a });
    });
  },
  dashboardOne: (req, res) => {
    Products.findOne({
      where: { id: req.params.id },
    }).then((a) => res.render("update", { a }));
  },
  delete: (req, res) => {
    Products.delete({ where: { id: req.params.id } }).then((a) => {
      res.redirect("/dashboard");
      res.end();
    });
  },
};
