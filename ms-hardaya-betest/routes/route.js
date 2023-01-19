const router = require("express").Router();
const UserControllerMongo = require("../controllers/UserControllerMongo");
const authentification = require("../middlewares/authentification");
const userRoute = require('./user-route');

router.get("/", (req, res) => {
  res.status(200).json({ message: `Hola salam jastok. masok server ini` });
});
router.post("/login", UserControllerMongo.loginMethod);
router.post("/register", UserControllerMongo.addUserMethod);

router.use(authentification);
router.use('/users', userRoute);

module.exports = router;
