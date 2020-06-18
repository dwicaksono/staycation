const router = require("express").Router();
const { upload } = require("../middlewares/multer");
const apiController = require("../controllers/apiController");

router.get("/landing-page", apiController.landingPage);
router.get("/detail-page/:id", apiController.detailPage);
router.post("/booking-page", upload, apiController.bookingPage);

module.exports = router;
