import { Row,Col ,Form} from "react-bootstrap";
import { signUp } from "./auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Signup(){
    const navigate = useNavigate();
    const[userName, setUserName] =useState("");
    const[email, setEmail] =useState("");
    const[password, setPassword] =useState("");
    const[Error, setError] =useState("");
    const[Success, setSuccess] =useState(false);
  
    const Signup = async (e) =>{
      e.preventDefault();
      setError("");
  
     try {
        await signUp(email, password)
        setSuccess(true)
        navigate("/login")
     } 
     catch (err) {
      setError(err.message)
     }
     if(Success){
      return(
        <div className="text-success  d-flex justify-content-center">
          <h2>SignUp Successful!</h2>
        </div>
      )
     }
      
      setUserName("");
      setEmail("");
      setPassword("");
    }

    return (
        <>
        
        <Row className="d-flex justify-content-center mt-5">
            <Col  className='col-lg-6 card  col-md-6 col-sm-12 d-flex flex-column justify-content-center ' >
        <h3 className='text-bold mt-5 d-flex justify-content-center text-primary'>Create an Account</h3>
        <div className="d-flex justify-content-center mt-3 flex-row icon" >
        <a href='#'><i className=' link-underline-light card p-2 fa-brands fa-google-plus-g me-3 border-info text-primary'></i></a>
        <a href='#'><i className='fa-brands fa-facebook-f me-3 card border-info text-primary p-2 link-underline-light'></i></a>
        <a href='#'><i className='fa-brands fa-github me-3 card border-info text-primary p-2 link-underline-light'></i></a>
        <a href='#'><i className='fa-brands fa-linkedin-in me-3 card border-info text-primary p-2 link-underline-light'></i></a>
        </div>
        <span className='d-flex justify-content-center text-secondary mt-3'>or use email for registration</span>
        <Form >
          <input type='text' placeholder='Enter Name' className='form-control mt-3 d-flex justify-content-center ms-auto me-auto border-info w-50' value={userName} onChange={(e)=>setUserName(e.target.value)}></input>

          <input type='Email' placeholder='Enter Email' className='form-control mt-3 d-flex justify-content-center ms-auto me-auto border-info w-50' value={email} onChange={(e)=>setEmail(e.target.value)}></input>

          <input type='password' placeholder='Enter Password'className=' form-control mt-3 d-flex justify-content-center ms-auto me-auto border-info w-50' value={password} onChange={(e)=>setPassword(e.target.value)}  ></input>

          <button type='button' onClick={Signup}  className='d-flex justify-content-center ms-auto me-auto bg-primary text-light border-light rounded-3  mt-3 mb-5 px-3 py-1' >SIGN UP</button>
        </Form>
        {Error && <p className="text-danger d-flex justify-content-center">{Error}</p>}
        </Col>
      </Row>
        </>
    );
}