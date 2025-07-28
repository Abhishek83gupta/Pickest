import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setAllPosts } from "../../store/slices/postSlice";
import axios from "axios";

const HeroSection = () => {
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    try {
      const search = e.target.value;
      const res = await axios.get(import.meta.env.VITE_API_URL + `/api/post/search?search=${search}`);
      const { data } = await res.data;
      dispatch(setAllPosts(data));             // mapping from state
    } catch (error) {
      console.log(error);
    }
  };

    return (
      <div className="w-[90vw] sm:w-[60vw] h-[20vh] overflow-clip sm:rounded-3xl mx-auto flex justify-center items-center">
        <form className="relative flex justify-center items-center w-full">
          <div className="absolute left-4 sm:left-6 flex items-center">
            <IoIosSearch className="text-2xl sm:text-4xl text-gray-400" />
          </div>
          <input
            type="search"
            id="search"
            name="search"
            className="py-4 sm:py-5 pl-12 sm:pl-16 pr-3 w-full text-lg sm:text-2xl outline-none border-b-2 bg-bgColor rounded-full sm:rounded-full"
            placeholder="Search the assets of PhotoGallery"
            onChange={handleSearch}
          />
        </form>
      </div>
    );
};

export default HeroSection;
