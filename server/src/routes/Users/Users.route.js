const uc = require("../../controllers/Users/Users.controller");
const upload = require("../../middleware/multer");
const verifyToken = require("../../middleware/verifyToken");

const router = require("express").Router();

router.put("/deny-waitList/:id", verifyToken, uc.denyRequest);
router.put("/accept-waitList/:id", verifyToken, uc.acceptWaitList);
router.put("/set-onWaitList", verifyToken, uc.setOnWaitList);
router.put("/set-isOwner", verifyToken, uc.setIsOwner);
router.put("/update", verifyToken, upload.none(), uc.update);
router.post("/find/:id", uc.findUser);
router.post("/create-user", uc.signUp);
router.post("/login", uc.logIn);
router.get("/my-info", verifyToken, uc.getMyInfo);

module.exports = router;
