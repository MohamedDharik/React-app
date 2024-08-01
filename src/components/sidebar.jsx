import { Link } from "react-router-dom";


export default function sideBar(){
    

    return(
       
         <div className="sidebar d-flex flex-column bg-light  text-light p-4 vh-100">
           <a href="d-flex text-light align-items-center" style={{ textDecoration: 'none' }}>
           <i className="fa-solid fa-user-tie text-primary fs-5 me-3"></i>
            <span className="fs-4 index text-primary" style={{ textDecoration: 'none' }} >Welcome</span>
            </a>     
              
            <hr className="text-secondary"/>
              <ul className="nav nav-pills mt-2 flex-column">
               <li className="nav-item">
                   <Link to ='/dashboard' className="nav-link"><button className="py-1 btn border border-light"><span ><i className="fa-solid fa-table-columns me-2 "></i>Dashboard</span></button></Link>
               </li>

               <li className="nav-item">
                   <Link to ='/analytics' className="nav-link"><button className="py-1 btn border border-light"><span ><i className="fa-solid fa-chart-simple me-2"></i>Analytics</span></button></Link>
               </li>

               <hr className="text-secondary"/>

               <li className="nav-item">
                   <Link to = '/campaign' className="nav-link"><button className="py-1 btn border border-light"> <span ><i className="fa-solid fa-bullhorn me-2"></i>Campaigns</span></button></Link>
               </li>
               <li className="nav-item">
                   <Link to ='/broadcasts' className="nav-link"><button className="py-1 btn border border-light"><span ><i className="fa-solid fa-tower-broadcast me-2"></i>Broadcasts</span></button></Link>
               </li>

               <li className="nav-item">
                   <Link to ='#' className="nav-link"><button className="py-1 btn border border-light"> <span ><i className="fa-solid fa-chart-line me-2"></i>Transactional</span></button></Link>
               </li>

               <hr className="text-secondary"/>

               <li className="nav-item">
                   <a href="#" className="nav-link"><button className="py-1 btn border border-light"><span ><i className="fa-solid fa-people-group me-2"></i>People</span></button></a>
               </li>
               <li className="nav-item">
                   <a href="#" className="nav-link"><button className="py-1 btn border border-light"><span ><i className="fa-regular fa-id-badge me-2"></i>Segments</span></button></a>
               </li>
               <li className="nav-item">
                   <a href="#" className="nav-link"><button className="py-1 btn border border-light"> <span ><i className="fa-solid fa-chart-gantt me-2"></i>Activity Logs</span></button></a>
               </li>
               <li className="nav-item">
                   <a href="#" className="nav-link"><button className="py-1 btn border border-light">  <span ><i className="fa-solid fa-box-archive me-2"></i>Content</span></button></a>
               </li>
               <hr className="text-secondary"/>
               <br/>
               <br/>
              <br/>
               <li className="nav-item">
                   <a href="#" className="nav-link"><button className="py-1 btn border border-light">  <span ><i className="fa-solid fa-gear me-2"></i>Settings</span></button></a>
               </li>
              </ul>
                </div>
          
    );
}