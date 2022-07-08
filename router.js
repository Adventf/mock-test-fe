const router = require("express").Router();
const auth = require("./controllers/authController");
const restrict = require("./middlewares/restrict");

router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "register form" });
});
router.post("/register", auth.register);

router.get("/login", (req, res) => {
  res.render("login", { title: "login form" });
});
router.post("/login", auth.login);
router.post("/api/v1/auth/login", auth.akun);

router.get("/dashboard", restrict, auth.dashboard);
router.get("/dashboard/:id", auth.dashboardOne);

router.get("/products", (req, res) => {
  res.render("create", { title: "Create" });
});
router.post("/products", auth.create);

router.post("/products/:id", auth.update);
router.post("/products/:id", auth.delete);

module.exports = router;
