import axios from "axios";
import React, { useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import ImageCard from "./ImageCard";
import { useDispatch, useSelector } from "react-redux";
import { setMyFavourites } from "../../store/slices/postSlice";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

function Favourite() {
  const favourites = useSelector((state) => state.posts.myFavourites);
  const dispatch = useDispatch();

  const getFavouritesPosts = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/posts/favourites",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      const data = await res.data;
      // console.log(data.data);

      if (data.success == true) {
        dispatch(setMyFavourites(data.data));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteFavouritePosts = async (author,postId) =>{
    try {
      const res = await axios.put(import.meta.env.VITE_API_URL + `/post/removeFromFavourites/${postId}`,
        {
          authorId:author,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      const data = await res.data;

      if (data.success == true) {
       toast.success(data.message);
       getFavouritesPosts();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getFavouritesPosts();
  },[]);

  return (
    <div>
      <DashboardHeader />
      <div className="mx-8 grid md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10">
        {/* Image card  */}
        {favourites?.length > 0 ? favourites?.map(({ _id, title, image, price, author}) => 
            <ImageCard
              key={_id}
              id={_id}
              img={image}
              title={title}
              price={price}
              author={author}
              icon1={
                <MdDelete
                  title="Delete"
                  className="text-3xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  onClick={()=>deleteFavouritePosts(author, _id)}
                />
              }
            />
          ) : <div className="text-black">No Such Favourites</div>
        }
      </div>
    </div>
  );
}

export default Favourite;
