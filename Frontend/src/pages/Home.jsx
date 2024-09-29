import React from 'react'
import { HeroSection, PhotoGallery } from '../Components/index.js'

const Home = () => {
  return (
    <div className=' mt-20 bg-[url("/bg.png")] bg-cover bg-no-repeat'>
      <h1 className="text-center text-3xl font-bold text-white pt-14">Digital Image Marketplace </h1>
      <p className='text-white text-center pt-2'>Explore over 4.9 million high-quality images, contributed by our talented community.</p>
      <HeroSection />
      <PhotoGallery />
    </div>
  )
}

export default Home
