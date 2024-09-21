const Order = require("../models/orderModel");
const User = require("../models/userModel");

const getOrders = async (req,res) => {
  //the getOrders function, which retrieves a list of orders based on the role of the user (buyer or seller)
  //and returns the appropriate orders


 // getting from middleware 
  const authorId = req.id;
  const authorAccountType = req.accountType;
  const author = req.author;

  try {
   
    let orders;
      // for buyer, the item purchased it will shown
    if(authorAccountType === "buyer"){  
      // the function searches for all orders where the purchaserId matches the authorId (the user's ID).
        orders = await Order.find({ purchaserId : authorId});
    } // for seller, who purchased their item it will shown
    else{
        orders = await Order.find({ author });
    }

    //Handling No Orders Found
    if(!orders){
        return res
         .status(404)
         .json({ success: false, message: "No Order found"});
    }

    return res.status(200).json({success:true, data : orders});
  } catch (error) {
    return res.status(200).json({success:false, message: error.message});
  }

}

module.exports = {
  getOrders
};