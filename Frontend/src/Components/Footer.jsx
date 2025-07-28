import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className={`bg-white rounded-md p-4 border-t-2 ${
        pathname === "/seller/profile" || pathname === "/buyer/profile"
          ? "hidden"
          : ""
      }`}
    >
        <p className="font-normal leading-7 text-grey-700 text-black text-center">
           @ {new Date().getFullYear()} Pickest. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
