import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import ImageCard from "../Components/ImageCard";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAllPosts } from "../../store/slices/postSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.allPosts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state)=>state.auth.role);
  const accessToken = localStorage.getItem("accessToken");

  const getAllImages = async () => {
    if (posts.length > 0) return; // resolve the unnessary api call
    const res = await axios.get(import.meta.env.VITE_API_URL + "/api/post/getAll");
    const { data } = await res.data;
    // console.log(data);
    dispatch(setAllPosts(data));
  };

  const purchaseImage = async (price, id, postUrl, author, title) => {
    if (!isAuthenticated) {
      toast.error("Please login to purchase asset");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/payment/generate",
        {
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );

      const { data } = await res.data;
      await handlePaymentVerify(data, id, postUrl, author, title, price);
      // will use using a function here to handle the payment verification
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePaymentVerify = async (
    data,
    id,
    postUrl,
    author,
    title,
    price
  ) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Abhishek Gupta",
      order_id: data.id,
      theme: {
        color: "#5f63b8",
      },
      handler: async (response) => {
        try {
          const res = await axios.post(
            import.meta.env.VITE_API_URL + "/api/payment/verify",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              postId: id,
              postUrl,
              author,
              title,
              price,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              withCredentials: true,
            }
          );
          const data = await res.data;
          toast.success(data.message);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
    };
    const razorpayWindow = new window.Razorpay(options);
    razorpayWindow.open();
  };

  const addToFavourite = async (author, postId) => {

    if (!accessToken) {
      toast.error("Please login to add to favourite");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/api/post/addToFavourites/${postId}`,
        {
          authorId: author,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      const data = res.data;
      if (data.success == true) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllImages();
  },[]);

  return (
    <div className="p-10 bg-white flex flex-col justify-center items-center">
      <h3 className="text-3xl font-semibold my-14">Photo Gallery</h3>

      {/* All my photos will be listed inside this div */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-20">
        {/* Image card  */}
        {posts?.map(({ _id, title, image, price, author }) => {
          return (
            <ImageCard
              key={_id}
              id={_id}
              title={title}
              author={author}
              img={image}
              price={price}
              icon1=
                {
                  <FaShoppingCart
                  title="Cart"
                  onClick={() =>
                    purchaseImage(price, _id, image, author, title)
                  }
                  className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                /> 
                }
              icon2={
                <IoIosHeart
                  title="Favourite"
                  onClick={() => addToFavourite(author, _id)}
                  className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                />
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default PhotoGallery;
