import React from "react";
import { Analytics, DashBoardSidebar, PhotoManagement } from "../Components/index.js";
import Orders from "../Components/Orders.jsx";
import { useDispatch, useSelector } from "react-redux";
import Favourite from "../Components/Favourite.jsx";

const SellerDashboard = () => {

  const tab = useSelector((state)=>state.nav.tab);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col sm:flex-row">
      <DashBoardSidebar />
      <div>
        {/* We will change the pages through switch case here */}
        {(() => {
          switch (tab) {
            case "photos-management" :
              return <PhotoManagement/>;
            case "analytics" :
              return <Analytics/>;
            case "orders" :  
              return <Orders/>;
            case "favourites" :
              return <Favourite/>;

            default:
              return <PhotoManagement/>;
          }
        })()}
      </div>
    </div>
  );
};

export default SellerDashboard;
