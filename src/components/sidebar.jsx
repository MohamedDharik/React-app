 
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";


  
export default function sideBar(){
        const location = useLocation();
      location.pathname='/dashboard'
     

    return(
  
         <div className="sidebar d-flex flex-column bg-light  text-light p-4 vh-100">
           <a href="d-flex text-light align-items-center mb-1" style={{ textDecoration: 'none' }}>
           <i className="fa-solid fa-user-tie text-primary fs-5 me-3"></i>
            <span className="fs-4 index text-primary" style={{ textDecoration: 'none' }} >Welcome Back</span>
            </a>     
              
            <hr className="text-secondary mb-1"/>

            <div className="d-flex flex-column " style={{ height: '100vh' }}>
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                    <Link to='/dashboard' className={`py-2 px-4 btn text-primary btn-outline-light ${location.pathname === '/dashboard'? 'active' : ''}`} >
       
                   <span><i className="fa-solid fa-table-columns me-2"></i>Dashboard</span>
      
                   </Link>
   </li>
    {/* <li className="nav-item">
      <Link to='/analytics' className={`py-2 px-4 btn text-primary btn-outline-light ${location.pathname === '/analytics' ? 'active' : ''}`}>
    
          <span><i className="fa-solid fa-chart-simple me-2"></i>Analytics</span>
        
      </Link>
    </li>  */}
    <div className="mb-5"></div>
    <div className="mb-5"></div>
    <div className="mb-5"></div>
    <div className="mb-5"></div>
    <div className="mb-5"></div>
    <div className="mb-5"></div>
    <div className="mb-5"></div>
    <div className="mb-5"></div>
    <div className="mb-5"></div>
    <div className="mb-3"></div>
  
    <li className=" nav-item mt-auto "> 
    <Link to='/'  className={`py-2 px-4 btn  btn-outline-primary  `} >
        
        <span><i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout</span>
      
    </Link>

    </li>
  </ul>
 
   
 
  
</div>
</div>

    );
}