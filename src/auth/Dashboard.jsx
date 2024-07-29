import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Row ,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from './auth'; 
import { useState,useEffect } from 'react';

const sidebarStyle = {
    background:'#f5f5f5',
    
};
 
 function Dashboard(){
   const navigate = useNavigate();

   const logout = (e)=>{
      navigate("/login")
   }
   
   const [user ,setUser]= useState();
   
   useEffect(() => {
      const fetchUser = async () => {
        try {
          const user = await getCurrentUser()
          setUser(user)
        } catch (err) {
          console.error(err)
        }
      }
  
      fetchUser()
    }, [])


    return(
        <>
        <div className="sidebar">
            <Container-fluid >
              <Row>
                <Col className='col-2   pe-none rounded-2'style={sidebarStyle}>
                <Row>
                <span className='d-flex justify-content-start ms-4 px-2 py-3 '><i className=" fa-solid fa-user mt-1  px-1 me-3 mb-4"> </i><h5 >User</h5></span>
                </Row>
                <Row className='d-flex justify-content-start  px-4 mb-3'>
                   <span ><i className="fa-solid fa-table-columns me-2    "></i>Dashboard</span>
                </Row>
                <Row className='d-flex justify-content-start  px-4 mb-1'>
                   <span ><i className="fa-solid fa-chart-simple me-2"></i>Analysis</span>
                </Row>

                <hr/>
               
                <Row className='d-flex justify-content-start  px-4 mt -2 mb-3'>
                   <span ><i className="fa-solid fa-bullhorn me-2"></i>Campaigns</span>
                </Row>
                
                <Row className='d-flex justify-content-start  px-4 mb-3'>
                   <span ><i className="fa-solid fa-tower-broadcast me-2"></i>Broadcasts</span>
                </Row>
                
                <Row className='d-flex justify-content-start  px-4 mb-1'>
                   <span ><i className="fa-solid fa-chart-line me-2"></i>Transactional</span>
                </Row>
                <hr/>
                <Row className='d-flex justify-content-start  px-4 mb-3'>
                   <span ><i className="fa-solid fa-people-group me-2"></i>People</span>
                </Row>
                <Row className='d-flex justify-content-start  px-4 mb-3'>
                   <span ><i className="fa-regular fa-id-badge me-2"></i>Segments</span>
                </Row>
                

                <Row className='d-flex justify-content-start  px-4 mb-1'>
                   <span ><i className="fa-solid fa-chart-gantt me-2"></i>Activity Logs</span>
                </Row>

                <hr/>

                <Row className='d-flex justify-content-start  px-4 mb-1'>
                   <span ><i className="fa-solid fa-box-archive me-2"></i>Content</span>
                </Row>
                <hr/>
               
               <br/>
               <br/>
              <br/>
               
       
                <Row className='d-flex justify-content-start  px-4 '>
                   <span ><i className="fa-solid fa-gear me-2"></i>Settings</span>
                </Row>

                
                </Col>
                
                <Col className='col-10 card rounded-2 border  mt-2'>
                <span className='d-flex flex-row'><input className='form-control mt-2 ms-2 w-25' type='text' placeholder='Search...'></input><button type='button' className=' ms-1 mt-2  btn btn-outline-primary py-0 px-3'>search</button><button type='button' onClick={logout} className='ms-5 mt-2 flex-row d-flex justify-content-center btn btn-outline-primary  px-3'>logout</button></span>
                
                <hr/>
                <h3 className='mt-0 mb-2 ms-3 text-primary'>Dashboard</h3>
                {user &&(
                  <Row>
                     <Col className='col-5 ms-3 card border'>
                     
                     <h4 className='mt-2 mb-0'>Login Users</h4>
                     <hr/>
                    <strong className='ms-3'>Email</strong> 

                     <p>{user.email}</p>
                     </Col>
                                  
                     
                  </Row>
                                           )}
                
                </Col>
            </Row>
                  
            </Container-fluid>
        </div>
        </>
    );

 }
 export default Dashboard;