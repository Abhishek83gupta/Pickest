const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");

// Create post
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
    .json({success: true, message:"Post created successfully",post});

  } catch (error) {
    return res.status(500).json({success: false, message: error.message});
  }
};

// getAllPost
const getAllPosts = async (req,res) =>{
  try {
    const posts = await Post.find({});
    if(posts.length === 0)
      return res
        .status(404)
        .json({succes:false, message: "No post found"});

     return res.status(200).json({succes:true, data:posts})   

  } catch (error) {
    return res.status(500).json({success:false, message:error.message});
  }
}

// GetMyposts
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

     return res.status(200).json({succes:true, data: uploads})
     }
  } catch (error) {
    return res.status(500).json({success:false, message:"Internal server error"})
  }
}

// deletePost
const deletePost = async(req,res) =>{
  const {id} = req.params   

  try {
    const post = Post.findById(id)

    if(!post)
      return res
      .status(404)
      .json({succes:false, message:"Post not found"})

    const { authorId } = post
    await User.findByIdAndUpdate(authorId,{
      $pull:{uploads:id}
    })

   // we will not do as some of the people had already purchased your asset
   // await Post.findByIdAndDelete(id)
 
    return res
      .status(200)
      .json({succes:true, message:"Post deleted succesfully"})

  } catch (error) {
    return res.status(500).json({succes:false, message:"Internal server Error"})
  }
}

//Search post
const searchPost = async (req,res) =>{
   const { search } = req.query;
   try {
    const posts = await Post.find({title:{ $regex: search, $options: "i" }});

    if(posts.length == 0)
      return res.status(404).json({succes:false, message:"Post not found"});

    return res.status(200).json({succes :true, data:posts});
   } catch (error) {
    return res.status(500).json({succes:false, message:error.message});
   }
}

// addtofavourite
const addToFavourites = async(req, res) =>{
  const { authorId } = req.id     // through Bearer token 
  const { postId } = req.params

  try {
    const user = User.findByIdAndUpdate(authorId,{
      $push: { favourites : postId}
    })

    if(!user)
      return res
       .status(404)
       .json({succes:false, message: "User not Found"})
    
      return res.status(200).json({success:true, message:"Post added to favourite"})
  } catch (error) {
    return res.status(500).json({succes:false, message:error.message})
  }
}

// removefromfavourite
const removeFromFavourites = async(req, res) =>{
  const { authorId } = req.id     // through Bearer token 
  const { postId } = req.params

  try {
    const user = User.findByIdAndUpdate(authorId,{
      $pull: { favourites : postId}
    })

    if(!user)
      return res
       .status(404)
       .json({succes:false, message: "User not Found"})
    
      return res.status(200).json({success:true, message:"Post added to favourite"})
  } catch (error) {
    return res.status(500).json({succes:false, message:error.message})
  }
}

// getfavourite
const getFavourites = async (req, res) => {

  const authorId = req.id
  try {
    const { favourites } = await User.findById(authorId).populate("favourites")
    if(!favourites)
      return res
      .status(404)
      .json({success:false, message:"No Favourites added"})

    return res.status(200).json({ success : true, data:favourites })
 
  } catch (error) {
    return res.status(500).json({success:false, message:error.message})
  }
}


const getPostsByDateRange = async (req, res) =>{
  const authorId = req.id;
  const authorAccountType = req.accountType
  let data;

  try {
    if(authorAccountType == "buyer"){    // if buyer ,we have to grab data from their purchased assets
      const { purchased } = User.findById(authorId).populate("purchased");
      data = purchased 
    } else { // if seller then we need uploads data
      const { uploads } = User.findById(authorId).populate("uploads");
      data = uploads
    }

    if(!data)
       return res
      .status(500)
      .json({succes :false, message: "No post found "})

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth)
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))

    const postsThisYear = data.filter(
      (post) => new Date(post.createdAt) >= startOfYear
    );
    const postsThisMonth = data.filter(
      (post) => new Date(post.createdAt) >= startOfMonth
    );
    const PostsThisWeek = data.filter(
      (post) => new Date(post.createdAt) >= startOfWeek
    );

    return res
       .status(200).json({success: true, 
        data : {
          tillNow : data,
          thisYear : postsThisYear,
          thisMonth : postsThisMonth,
          thisWeek : PostsThisWeek
        }
       })

  } catch (error) {
    return res.status(500).json({success:false, message:error.message})
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  searchPost,
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  getPostsByDateRange
}