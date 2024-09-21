const express = require("express");
const router = express.Router();

const { getOrders } = require("../controllers/orderController");
const { verifyToken }= require("../middlewares/verifyToken");

router.get("/orders/get", verifyToken, getOrders);

module.exports = router;