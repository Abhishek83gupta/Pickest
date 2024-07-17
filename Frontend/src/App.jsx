import { useEffect, useRef } from "react";
import { Navbar, Footer } from "./Components/index.js";
import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";

const App = () => {
    const nodeRef = useRef(null);
    const location = useLocation();

  useEffect(()=>{
    if(nodeRef.current){
      gsap.fromTo(nodeRef.current, {opacity:0}, {opacity:1, duration:1})
    }
  },[location])  
  return (
    <div ref={nodeRef}>
      <Navbar />
      <Outlet location={location} />
      <Footer />
    </div>
  );
};

export default App;