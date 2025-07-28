import React, { useEffect } from "react";
import { DashboardHeader, ImageAdd } from "../index.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../../../store/slices/authSlice.js";
import { setMyPosts } from "../../../store/slices/postSlice.js"
import axios from "axios";
import ImageCard from "../ImageCard";
import { MdDelete } from "react-icons/md";
import { removePost } from "../../../store/slices/postSlice.js";

const PhotoManagement = () => {
  const posts = useSelector((state) => state.posts.myPosts);
  const dispatch = useDispatch();

  const getMyPosts = async () => {
    try {
      if (posts.length > 0) return;
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/api/post/myPosts",
        {
          headers: {
           Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      const { data } = await res.data;
      dispatch(setMyPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(logout());
    }
  };

  const deletePost = async (postId) =>{
    try {
      const res = await axios.delete(
        import.meta.env.VITE_API_URL + `/post/delete/${postId}`,
        {
          headers: {
           Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
  
      const data = res.data;
      if(data.success == true){
        dispatch(removePost(postId)); // Directly remove the post from Redux state
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    
  }

  useEffect(() => {
    getMyPosts();
  },[]);

  return (
    <div className="flex flex-col sm:flex-row ">
      <div>
        {/* Dashboard header will be here */}
        <DashboardHeader />
        {/* Image add component will be here */}
        <ImageAdd />
      </div>

      {/* Section where all the images are displayed */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-5 bg-transparent sm:bg-white p-5 w-[90vw] sm:w-[55vw] sm:h-[95vh] sm:overflow-y-scroll rounded-lg sm:mx-4 mx-auto">
        {posts.length > 0 &&
          posts?.map(({ _id, title, image, author, price }) => {
            return (
              <ImageCard
                key={_id}
                id={_id}
                title={title}
                img={image}
                author={author}
                price={price}
                icon2={
                  <MdDelete
                    title="Delete"
                    className="text-3xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                    onClick={()=>deletePost(_id)}
                  />
                }
              />
            );
          })}
      </div>
    </div>
  );
};

export default PhotoManagement;