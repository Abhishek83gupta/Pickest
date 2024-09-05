import React from 'react'
import { Analytics, DashBoardSidebar, PhotoManagement} from '../Components/index.js'

const SellerDashboard = () => {
  return (
    <div className='flex flex-col sm:flex-row'>
      <DashBoardSidebar/>
      <div>  {/*We will change the pages through switch case here */}</div>
      <PhotoManagement/>
      {/* <Analytics/> */}
    </div>
  )
}

export default SellerDashboard
