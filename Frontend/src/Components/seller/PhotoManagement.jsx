import React from 'react'
import { DashboardHeader, ImageAdd  } from '../index.js'

const PhotoManagement = () => {
  return (
    <div className='flex flex-col sm:flex-row'>
      <div>
        {/* Dashboard header will be here  */}
        <DashboardHeader/>
        {/* Image add component will be here  */}
        <ImageAdd/>
      </div>
    </div>
  )
}

export default PhotoManagement
