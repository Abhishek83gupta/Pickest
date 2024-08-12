import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoutes = ({ children }) => {
  
  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)
  const role = useSelector((state)=>state.auth.role)
  const location = useLocation()

  return (
    <div> 
     
    </div>
  )
}

export default ProtectedRoutes
