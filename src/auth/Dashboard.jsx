import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Row ,Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from './auth'; 
import { useState,useEffect } from 'react';
 import Sidebar from '../components/sidebar.jsx'
  


 
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
                <Row>
                  <Col>
                  <Sidebar></Sidebar>
                  </Col>
               
            
                <Col className='col-10 card rounded-2 border vh-100  mt-2'>
                <span className='d-flex flex-row'><input className='form-control mt-2 ms-2 w-25' type='text' placeholder='Search...'></input><button type='button' className=' ms-1 mt-2  btn btn-outline-primary py-0 px-3'>search</button><button type='button' onClick={logout} className='ms-5 mt-2 flex-row d-flex justify-content-center btn btn-outline-primary  px-3'>logout</button></span>
                
                <hr/>
                <h3 className='mt-0 mb-2 ms-3 text-primary'>Dashboard</h3>
                {user &&(
                  <Row>
                     <Col className='col-5 ms-3 card border'>
                     
                     <h4 className='mt-2 mb-0'>Login Users</h4>
                     <hr/>
                    
                     <p><strong>Name: </strong>{user.name}</p>
                     <p><strong>Email: </strong>{user.email}</p>
                     <p><strong>Phone: </strong>{user.phone_number}</p>
                     </Col>
                                  
                     
                  </Row>
                  )}
                
                </Col>
                </Row>
        </>
    );

 }
 export default Dashboard;