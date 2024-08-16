import { Row,Col,Form} from "react-bootstrap"; 
import { useState } from "react";
import { signIn } from "./auth";
 import { useNavigate } from "react-router-dom";
 import Loader from '../components/loader.jsx'

export default function Login(){
  const navigate =useNavigate();
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const[Error,setError]=useState("");
  const[isLoading,setIsLoading]=useState(false);


  const login= async (e)=>{
    e.preventDefault()
    setError("");
    try {
      await signIn(email,password)
      console.log("success");
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/Dashboard'); 
      }, 3000); 
    } catch (err) {
      setError(err.message)
    }
  
  setEmail(""); setPassword("");
}


    return(
     
        <Row className = 'd-flex justify-content-center mt-5 '>
          <div className = 'd-flex justify-content-center mt-5 '>
          {isLoading ? (
            <Loader /> 
            ) : (
        <Col  className='col-lg-6 card col-md-6 col-sm-12 d-flex flex-column justify-content-center ' >
       
       
        <h3 className='text-bold mt-5 d-flex justify-content-center text-primary'>Sign In</h3>
        <Form  >
          <input type='Email' placeholder='Email' className='form-control mt-3 d-flex justify-content-center ms-auto me-auto border-info w-50' value={email} onChange={(e)=>setEmail(e.target.value)}></input>

          <input type='password' placeholder='Password' className=' form-control mt-3 d-flex justify-content-center ms-auto me-auto border-info w-50' value={password} onChange={(e)=>setPassword(e.target.value)}   ></input>

          <button type='button'   className='d-flex justify-content-center ms-auto me-auto bg-primary text-light border-light rounded-3 mt-3 mb-5 px-3 py-1' onClick={login}  >SIGN IN</button>
      
        </Form>
        {Error && <p  className="text-danger d-flex justify-content-center">{Error}</p>}
       
        </Col>
            )}
            </div>
        </Row>
     
    );
}