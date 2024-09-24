const Order = require("../models/orderModel");
const User = require("../models/userModel");

const getOrders = async (req, res) => {
  //the getOrders function, which retrieves a list of orders based on the role of the user (buyer or seller)
  //and returns the appropriate orders

  // getting from middleware
  const authorId = req.id;
  const authorAccountType = req.accountType;
  const author = req.author;

  try {
    let orders;
    // for buyer, the item purchased it will shown
    if (authorAccountType === "buyer") {
      // the function searches for all orders where the purchaserId matches the authorId (the user's ID).
      orders = await Order.find({ purchaserId: authorId });
    } // for seller, who purchased their item it will shown
    else {
      // retrieves the all orders where the author field matches the authenticated user's details.
      orderData = await Order.find({ author });

      // then finds the username of the purchaser by fetching their information from the User model using the purchaserId.
      const { username } = await User.findById(orderData[0].purchaserId);
      console.log(username);
      
      orders = orderData.map((order) => {
        return {
          author: order.author,
          title: order.title,
          price: order.price,
          createdAt: order.createdAt,
          razorpayOrderId: order.razorpayOrderId,
          postUrl: order.postUrl,
          razorpayPaymentId: order.razorpayPaymentId,
          razorpaySignature: order.razorpaySignature,
          purchaserId: order.purchaserId,
          _id: order._id,
          purchaser: username,
        };
      });
    }

    //Handling No Orders Found
    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "No Order found" });
    }

    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(200).json({ success: false, message: error.message });
  }
};

module.exports = {
  getOrders,
};
