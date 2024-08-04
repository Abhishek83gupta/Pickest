const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");

//Create post
const createPost = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;

  if (authorAccountType == "buyer") {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden, only sellers can post" });
  }

  const { title, author, price, image, publicId } = req.body;

  try {
    
    // Post creation
    const post = new Post({title, author, price, image, publicId, authorId});
    await post.save();

    await User.findByIdAndUpdate(authorId, {
        $push : {uploads : post._id}
    })

    return res
    .status(201)
    .json({success: false, message:"Post created successfully",post});

  } catch (error) {
    return res.status(500).json({success: false, message: error.message});
  }
};


// getAllPost
const getAllPost = async (req,res) =>{
  try {
    const posts = Post.find({});
    if(posts.length === 0)
      return res
        .status(404)
        .json({succes:false, message: "No post found"});

     return res.status(200).json({succes:true, data:posts})   

  } catch (error) {
    return res.status(500).json({success:true, message:error.message});
  }
}


const getMyPosts = async (req,res) =>{
  const authorId = req.id;
  const authorAccountType = req.accountType;
  
  try {
    
    // for Buyer
    if(authorAccountType === "buyer"){
      const { purchased } = await User.findById(authorId).populate("purchased")
      
      console.log(purchased)
      if(!purchased)
        return res
          .status(404)
          .json({success:false, message: "No posts found"});

      return res.status(200).json({success: true, data:purchased})    
    } 
    // for seller
    else {
       const {uploads} = await User.findById(authorId).populate("uploads")

       if(!uploads) 
        return res
      .status(404)
      .json({success:false, message: "No post found"})

     return res.status(200).json({succes:true, message:error.message})
     }
  } catch (error) {
    return res.status(500).json({success:false, message:"Internal server error"})
  }
}


module.exports = {
  createPost,
  getAllPost,
  getMyPosts
}