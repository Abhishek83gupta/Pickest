import React from 'react'
import { Analytics, DashBoardSidebar, PhotoManagement } from "../Components/index.js";
import Orders from "../Components/Orders.jsx";
import { useSelector } from "react-redux";
import PhotosPurchased from "../Components/buyer/PhotosPurchased.jsx"
import Favourite from '../Components/Favourite.jsx';

const BuyerDashboard = () => {
  
  const tab = useSelector((state)=>state.nav.tab);

  return (
    <div className="flex flex-col sm:flex-row">
      <DashBoardSidebar />
      <div>
        {/* We will change the pages through switch case here */}
        {(() => {
          switch (tab) {
            case "photos-management" :
              return <PhotosPurchased/>;
            case "analytics" :
              return <Analytics/>;
            case "orders" :  
              return <Orders/>
            case "favourites" :
              return <Favourite/>

            default:
              return <PhotosPurchased/>;
          }
        })()}
      </div>
    </div>
  );
}

export default BuyerDashboard
