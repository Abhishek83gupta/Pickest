const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");

// Create post
const createPost = async (req, res) => {
  // getting from middleware
  const authorId = req.id;
  const authorAccountType = req.accountType;

  // Checking the accounttype
  if (authorAccountType == "buyer") {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden, only sellers can post" });
  }

  // from frontend getting data
  const { title, author, price, image, publicId } = req.body;

  try {
    // Post creation
    const post = new Post({ title, author, price, image, publicId, authorId });
    await post.save();

    // In user model finding by _id
    // and pushing in uploads posts
    await User.findByIdAndUpdate(authorId, {
      $push: { uploads: post._id },
    });

    return res
      .status(201)
      .json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// getAllPost
const getAllPosts = async (req, res) => {
  try {
    // Finding all the posts
    const posts = await Post.find({});

    // if not found posts
    if (posts.length === 0)
      return res.status(404).json({ succes: false, message: "No post found" });

    // Sending all the posts to frontend
    return res.status(200).json({ succes: true, data: posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GetMyposts
const getMyPosts = async (req, res) => {
  // getting from middleware
  const authorId = req.id;
  const authorAccountType = req.accountType;

  try {
    // if Buyer, then find by _id inside that specific purchased field
    if (authorAccountType === "buyer") {
      const { purchased } = await User.findById(authorId).populate("purchased");

      console.log(purchased);
      if (!purchased)
        return res
          .status(404)
          .json({ success: false, message: "No posts found" });

      return res.status(200).json({ success: true, data: purchased });
    }
    // if seller,then find by _id inside that specific uploads field
    else {
      const { uploads } = await User.findById(authorId).populate("uploads");
      
      if (!uploads)
        return res
          .status(404)
          .json({ success: false, message: "No post found" });

      return res.status(200).json({ succes: true, data: uploads });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// The  function deletePost, which handles deleting a specific post by its ID
// It also ensures that while the post is removed from the author's uploads, it does not fully delete the post because buyers may have already purchased it. 
const deletePost = async (req, res) => {
  // The id parameter is extracted from the request's URL parameters.
  // This id represents the post that needs to be deleted.
  const { id } = req.params;

  try {
    // finding post by id
    const post = await Post.findById(id);

    // if not post
    if (!post)
      return res.status(404).json({ success: false, message: "Post not found" });

    // This code extracts the authorId from the post document, which represents the user who created the post.
    const { authorId } = post;
  
    // It then updates the author's record in the User collection using findByIdAndUpdate to remove the id of the post from their uploads array.
    // The $pull operator removes the specific id from the uploads array, effectively "detaching" the post from the user's list of uploaded posts.
    await User.findByIdAndUpdate(authorId, {
      $pull: { uploads: id },
    });

    // we will not do as some of the people had already purchased your assets
    // await Post.findByIdAndDelete(id)

    return res
      .status(200)
      .json({ success: true, message: "Post deleted succesfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ succes: false, message: "Internal server Error" });
  }
};

//Search post
const searchPost = async (req, res) => {
  // from frontend
  const { search } = req.query;
  try {

    //  search the database for posts where the title field matches the search term.
    // $options: "i" makes the search case-insensitive, meaning it will match the title regardless of whether the search term is in uppercase or lowercase.                          
    const posts = await Post.find({ title: { $regex: search, $options: "i" } });

    // if post not found
    if (posts.length == 0)
      return res.status(404).json({ succes: false, message: "Post not found" });

    // sending that post to frontend
    return res.status(200).json({ succes: true, data: posts });
  } catch (error) {
    return res.status(500).json({ succes: false, message: error.message });
  }
};

// This function addtofavourite is designed to allow users to add a specific post 
const addToFavourites = async (req, res) => {

  // getting from middleware user model _id
  const  authorId  = req.id;
  // postId is extracted from req.params, which means it's passed in the URL (e.g., /posts/:postId).
  // It represents the ID of the post that the user wants to add to their favorites.
  const { postId } = req.params;
  
  try {
     // Find the user first
     const user = await User.findById(authorId);

     if (!user)
       return res.status(404).json({ success: false, message: "User not found" });
 
     // Check if postId is already in the user's favourites array
     const isAlreadyFavourite = user.favourites.includes(postId);
 
     if (isAlreadyFavourite) {
       return res.status(400).json({
         success: false,
         message: "Post is already in favourites",
       });
     }

    await User.findByIdAndUpdate(authorId, {
      $push: { favourites: postId },
    });
    
    // if user not found
    if (!user)
      return res.status(404).json({ success: false, message: "User not Found" });

    return res
      .status(200)
      .json({ success: true, message: "Post added to favourite" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// The removeFromFavourites function allows a user to remove a specific post from their list of favorite posts.
const removeFromFavourites = async (req, res) => {

  // getting from middleware
  const  authorId  = req.id; 
  // postId is extracted from the URL parameters (req.params),
  // representing the ID of the post that the user wants to remove from their favorites.
  const { postId } = req.params;

  try {

  // This line attempts to find the user in the database by their authorId and update their document by removing the postId from their favourites array.  
  // The $pull operator removes the specified postId from the favourites array in the user's document if it exists. If postId is not present in the array, nothing happens.
    const user = await User.findByIdAndUpdate(authorId, {
      $pull: { favourites: postId },
    });
    
  // if user not found
    if (!user)
      return res.status(404).json({ succes: false, message: "User not Found" });

    return res
      .status(200)
      .json({ success: true, message: "Post removed from favourites" });
  } catch (error) {
    return res.status(500).json({ succes: false, message: error.message });
  }
};

// getfavourite
const getFavourites = async (req, res) => {

  // getting from middleware
  const authorId = req.id;

  try {
    // Finding by id and return specific favourite field
    const { favourites } = await User.findById(authorId).populate("favourites");

    // if favourite not found
    if (!favourites)
      return res
        .status(404)
        .json({ success: false, message: "No Favourites added" });
   
    // sending favourite data to frontend
    return res.status(200).json({ success: true, data: favourites });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPostsByDateRange = async (req, res) => {
  // getting from middleware
  const authorId = req.id;
  const authorAccountType = req.accountType;

  let data;

  try {
    if (authorAccountType == "buyer") {
      // if buyer, we have to grab data from their purchased assets
      const { purchased } = await User.findById(authorId).populate("purchased");
      data = purchased;
    } else {
      // if seller, then we need uploads data
      const { uploads } = await User.findById(authorId).populate("uploads");
      data = uploads;
    }

    // if post not found
    if (!data || data.length === 0)
      return res.status(404).json({ success: false, message: "No post found" });

    const now = new Date();

    // Get the start of the year, month, and week
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Calculate the start of the week
    const startOfWeek = new Date(now); // Clone the current date
    const dayOfWeek = startOfWeek.getDay(); // Get the current day of the week (0 = Sunday, 6 = Saturday)
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek); // Subtract the number of days to get to Sunday
    startOfWeek.setHours(0, 0, 0, 0); // Reset the time to midnight

    // Filter posts based on the date range
    const postsThisYear = data.filter(
      (post) => new Date(post.createdAt) >= startOfYear
    );
    const postsThisMonth = data.filter(
      (post) => new Date(post.createdAt) >= startOfMonth
    );
    const postsThisWeek = data.filter(
      (post) => new Date(post.createdAt) >= startOfWeek
    );

    return res.status(200).json({
      success: true,
      data: {
        tillNow: data,
        thisYear: postsThisYear,
        thisMonth: postsThisMonth,
        thisWeek: postsThisWeek,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  searchPost,
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  getPostsByDateRange,
};
