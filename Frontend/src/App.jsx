import React from 'react'
import {Outlet} from 'react-router-dom' 
import {Navbar, Footer} from './Components/index.js'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
