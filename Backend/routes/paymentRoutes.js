const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { generateOrder, verifyOrder} = require("../controllers/paymentController")

router.post("/payment/generate", verifyToken, generateOrder);
router.post("/payment/verify", verifyToken, verifyOrder);


module.exports = router;