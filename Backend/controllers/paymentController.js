const Razorpay = require("razorpay");
const User = require("../models/userModel");
const crypto = require("crypto");
const Order = require("../models/orderModel")
const Post = require("../models/postModel")

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const generateOrder = async (req, res) => {

  //getting from middleware
  const purchaserId = req.id;
  // from frontend
  const { price } = req.body;

  try {
    let user = await User.findById(purchaserId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const options = {
      amount: Number(price * 100),
      currency: "USD",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    // Sending generated order to frontend
      return res.status(200).json({ success: true, data: order });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOrder = async (req, res) => {

  // getting from middleware
  const purchaserId = req.id;

  // from frontend
  const { razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          postUrl,
          author,
          title,
          price,
          postId } = req.body;

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac(
      "sha256",                          // Alogrithm name
      process.env.RAZORPAY_SECRET
    ).update(sign.toString()).digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    // Creating Order in DB
    if(isAuthentic){
      const order = new Order({
        purchaserId,
        postUrl,
        razorpayOrderId : razorpay_order_id,
        razorpayPaymentId : razorpay_payment_id,
        razorpaySignature : razorpay_signature,
        author,
        title,
        price,
      });
      await order.save();

      // finding by userid and updating purchased field in user model
      // pushing order to user purchased field
      let userData = await User.findByIdAndUpdate(purchaserId, {
        $push:{ purchased : order._id },
      })
      
      // finding by postid and updating the purchasedBy field in Post model
      // pushing userid 
      let postData = await Post.findByIdAndUpdate(postId,{
        $push: { purchasedBy: purchaserId },
      })

      return res
        .status(200)
        .json({success: true, message:"Payment successfull"})
    }

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  generateOrder,
  verifyOrder
}