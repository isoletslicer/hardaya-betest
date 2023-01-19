const router = require("express").Router();
const UserControllerMongo = require("../controllers/UserControllerMongo");
const authorization = require("../middlewares/authorization");


router.get("/", UserControllerMongo.showAllUser);

router.get("/:id", UserControllerMongo.showUserById);
router.put("/:id", authorization, UserControllerMongo.updateUserMethod);
router.delete("/:id", authorization, UserControllerMongo.deleteUserMethod);
router.get("/user/i/:identityNumber", UserControllerMongo.showUserByIdentityNumber);
router.get("/user/a/:accountNumber", UserControllerMongo.showUserByAccountNumber);

module.exports = router;