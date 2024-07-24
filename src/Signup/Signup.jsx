import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Row,Col,Form} from 'react-bootstrap'



const disabledColumnStyle = {
  pointerEvents: 'none',
  opacity: 0.5,
};

const disabledInputStyle = {
  backgroundColor: '#e9ecef', 
  borderColor: '#dee2e6', 
  cursor: 'not-allowed',
};

function Signup(){

  const[signinEmail, setSigninEmail] =useState("");
  const[signinpassword, setSigninpassword] =useState("");
  
  const output = () =>{
    

   
    setSigninEmail(" ");
    setSigninpassword(" ");
  }
 
  const[signin, setSignin]=useState(true);
  const[signup, setSignup]=useState(false);

  const Toggle=()=>{
    setSignin(!signin);
    setSignup(!signup);
  };


  return(
    <>
    <Row>
      <Col className='d-flex justify-content-center flex-row mt-5'>
      <input type="radio" className="btn-check" name="options-outlined" id="secondary-outlined" onClick={Toggle} ></input>
      <label className="btn btn-outline-secondary me-2" htmlFor="secondary-outlined" >Sign In</label>
      <input type="radio" className="btn-check" name="options-outlined" id="primary-outlined" onClick={Toggle} ></input>
      <label className="btn btn-outline-primary ms-2" htmlFor="primary-outlined">Sign Up</label>
    </Col>
    </Row>
    <div className="mt-5 card shadow p-4 mb-5 bg-white rounded border rounded-4 d-flex justify-content-center ms-auto me-auto  w-75">
      <Row >
        <Col  className='col-6 d-flex flex-column justify-content-center ' style={signin ? disabledColumnStyle : {}}>
        <h3 className='text-bold mt-5 d-flex justify-content-center text-primary'>Sign In</h3>
        <div className="d-flex justify-content-center mt-3 flex-row icon" disabled={signin}>
        <a href='#'><i className=' link-underline-light card p-2 fa-brands fa-google-plus-g me-3 border-info text-primary'></i></a>
        <a href='#'><i className='fa-brands fa-facebook-f me-3 card border-info text-primary p-2 link-underline-light'></i></a>
        <a href='#'><i className='fa-brands fa-github me-3 card border-info text-primary p-2 link-underline-light'></i></a>
        <a href='#'><i className='fa-brands fa-linkedin-in me-3 card border-info text-primary p-2 link-underline-light'></i></a>
        </div>
        <span className='d-flex justify-content-center text-secondary mt-3'>or use email and password </span>
        <Form  >
          <input type='Email' placeholder='Enter Email' className='form-control mt-3 d-flex justify-content-center ms-auto me-auto border-info w-50' value={signinEmail} onChange={(e)=>setSigninEmail(e.target.value)}  style={signin ? disabledInputStyle : {}} disabled={signin}></input>

          <input type='password' placeholder='Enter Password' className=' form-control mt-3 d-flex justify-content-center ms-auto me-auto border-info w-50' value={signinpassword} onChange={(e)=>setSigninpassword(e.target.value)}  style={signin ? disabledInputStyle : {}} disabled={signin}  ></input>

          <a href='#' className='d-flex ms-auto me-auto justify-content-center mt-3 text-secondary  link-underline-light'   style={signin ? disabledInputStyle : {}} disabled={signin}>Forget Your Password?</a>
          <button type='button' onClick={output} className='d-flex justify-content-center ms-auto me-auto bg-primary text-light border-light rounded-3 mt-3 mb-5 px-3 py-1'  style={signin ? disabledInputStyle : {}} disabled={signin}>SIGN IN</button>
        </Form>
        </Col>

        <Col  className='col-6 d-flex flex-column justify-content-center ' style={signup ? disabledColumnStyle : {}}>
        <h3 className='text-bold mt-5 d-flex justify-content-center text-primary'>Create an Account</h3>
        <div className="d-flex justify-content-center mt-3 flex-row icon" disabled={signup}>
        <a href='#'><i className=' link-underline-light card p-2 fa-brands fa-google-plus-g me-3 border-info text-primary'></i></a>
        <a href='#'><i className='fa-brands fa-facebook-f me-3 card border-info text-primary p-2 link-underline-light'></i></a>
        <a href='#'><i className='fa-brands fa-github me-3 card border-info text-primary p-2 link-underline-light'></i></a>
        <a href='#'><i className='fa-brands fa-linkedin-in me-3 card border-info text-primary p-2 link-underline-light'></i></a>
        </div>
        <span className='d-flex justify-content-center text-secondary mt-3'>or use email for registration</span>
        <Form >
          <input type='text' placeholder='Enter Name' className='form-control mt-3 d-flex justify-content-center ms-auto me-auto border-info w-50'  style={signup ? disabledInputStyle : {}} disabled={signup}></input>
          <input type='Email' placeholder='Enter Email' className='form-control mt-3 d-flex justify-content-center ms-auto me-auto border-info w-50' style={signup ? disabledInputStyle : {}} disabled={signup}></input>
          <input type='password' placeholder='Enter Password'className=' form-control mt-3 d-flex justify-content-center ms-auto me-auto border-info w-50' style={signup ? disabledInputStyle : {}} disabled={signup}></input>
          <button type='button' className='d-flex justify-content-center ms-auto me-auto bg-primary text-light border-light rounded-3  mt-3 mb-5 px-3 py-1' style={signup ? disabledInputStyle : {}} disabled={signup}>SIGN UP</button>
        </Form>
        </Col>
      </Row>
    </div>
   
    </>
  );
}
export default Signup;
