import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { login, logout } from "../../store/slices/authSlice"
import axios from "axios"
import { useEffect } from "react";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  const role = useSelector((state)=>state.auth.role)


  const refreshToken = async () =>{
   try {
    const res = await axios.get(import.meta.env.VITE_API_URL + "/api/refresh", {
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("refreshToken"),
      }
    })

    const data = res.data;
    dispatch(login(data));

   } catch (error) {
    dispatch(logout());
   }  
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      refreshToken()
    }, 1000 * 60 * 10) // 10 minutes interval 

    return () => clearInterval(interval)
  },[])

  return (
    <nav
      className={`flex flex-row sm:flex-row justify-between items-center sm:items-center py-6 px-5 ${
        pathname === "/seller/profile" || pathname === "/buyer/profile"
          ? "hidden"
          : "fixed"
      } fixed top-0 left-0 right-0 shadow-md gap-1 sm:gap-0 z-30 bg-white`}
    >
      {/* logo and site name */}
      <div className="flex justify-between items-center text-center">
        {/* I will add the image here later */}
        <Link to="/" className="font-bold text-3xl ml-5 ">
          <i className="text-red-500 text-center">PIC</i><span className="text-orange-400 text-center">KEST</span>
        </Link>
      </div>

      {/* list of other tabs */}

      <ul className="flex gap-5 text-lg font-semibold text-gray-400 ml-5 sm:ml-0">
        {/* <Link to="/" className="hover:text-black cursor-pointer sm:p-2">
          About
        </Link>
        <Link to="/" className="hover:text-black cursor-pointer sm:p-2">
          Contact
        </Link> */}

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="hover:text-black cursor-pointer sm:p-2"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="hover:text-black cursor-pointer sm:p-2"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Link to={`/${role}/profile`} className="hover:text-black cursor-pointer sm:p-2">
            Profile
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
