import React, { useEffect } from "react";
import { logout } from "../../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setMyPosts } from "../../../store/slices/postSlice";
import DashboardHeader from "../DashboardHeader";
import ImageCard from "../ImageCard";
import axios from "axios";
import { IoArrowDownCircle } from "react-icons/io5";
import toast from "react-hot-toast";

const PhotosPurchased = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.myPosts);

  const getMyPhotos = async () => {
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
      toast.error("Failed to fetch photos");
      dispatch(logout());
    }
  };

  useEffect(() => {
    getMyPhotos();
  }, []);

  const downloadImage = async (image, title) => {
    try {
      // fetching the image from provided url
      const response = await fetch(image);
      if (!response.ok) throw new Error("Failed to download image");

      // Convert the image response to blob
      const blob = await response.blob();

      // create an object url for the bob
      const url = URL.createObjectURL(blob);

      // create a temporary anchor element (a) to download the image
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.jpg`;

      // Append the anchor element to the body
      document.body.appendChild(a);

      // Trigger a click on the anchor element to start the download
      a.click();

      // remove the anchor element from the body and revoke the object url
      document.body.removeChild(a);
    } catch (error) {
      toast.error("Failed to fetch photos");
      dispatch(logout());
    }
  };


  return (
    <div>
      <DashboardHeader />
      <div className="mx-8 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        { posts?.length > 0 ? posts?.map(({ _id, title, postUrl, author, price }) => (
          <ImageCard
            key={_id}
            title={title}
            author={author}
            price={price}
            img={postUrl}
            icon2={
              <IoArrowDownCircle
                title="Download Now"
                className="text-2xl text-red-500 cursor-pointer
                hover:scale-110 transition-all ease-linear duration-300"
                onClick={() => downloadImage(postUrl, title)}
              />
            }
          />
        )) : <div>Not purchased photo yet</div>
      } 
      </div>
    </div>
  );
};

export default PhotosPurchased;
