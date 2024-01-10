const router = require("express").Router();
const lc = require("../../controllers/Listings/Listings.controller");
const upload = require("../../middleware/multer");
const verifyToken = require("../../middleware/verifyToken");

// routes
router.delete("/hard-delete/:id", verifyToken, lc.hardDeleteListing);
router.patch("/restore-listing/:id", verifyToken, lc.restoreListing);
router.get("/get-deleted-listings/:id", verifyToken, lc.getMyDeletedListings);
router.put("/create-reply/:id", verifyToken, lc.createReply);
router.get("/get-listing/:id", lc.getListing);
router.post("/post-comment/:id", verifyToken, lc.postComment);
router.put("/deny-waitList/:id", verifyToken, lc.denyRequest);
router.put("/accept-waitList/:id", verifyToken, lc.acceptWaitList);
router.put("/add-to-wait-list/:id", verifyToken, lc.addToWaitList);
router.delete("/delete/:id", verifyToken, lc.deleteListing);
router.get("/get-users-listings/:id", lc.getUsersListings);
router.get("/get-available", lc.getAvailable);
router.post("/create", verifyToken, upload.any("images"), lc.create);
router.put("/update/:id", verifyToken, upload.any("images"), lc.update);

module.exports = router;
