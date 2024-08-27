import { Row,Col,Form} from "react-bootstrap"; 
import { useState } from "react";
import { signIn} from "./auth";
 import { useNavigate,Link } from "react-router-dom";
 import { CognitoIdentityProviderClient, ForgotPasswordCommand, ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";


 import Loader from '../components/loader.jsx'
import Swal from "sweetalert2";

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
const client = new CognitoIdentityProviderClient({ region: 'us-east-1' });

   const forgetpassMenu=async()=>{
   
  const { value: username } = await Swal.fire({
    title: "Input email address",
    input: "email",
    inputLabel: "Your email address",
    inputPlaceholder: "Enter your email address"
  });
   
  if (username) {
    const forgotPassword = async (username) => {
      const command = new ForgotPasswordCommand({
        ClientId: '52i4pstap6ea0hrl5vmt0nqu6g', 
        Username: username,
      });
  
      try {
        const response = await client.send(command);
        console.log('Verification code sent:', response);
      } catch (error) {
        console.error('Error sending verification code:', error);
      }
    };
  
    
    forgotPassword(username);
  }
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

          <Link to = '/resetpassword' ><a className='text-secondary mt-3 d-flex justify-content-center ms-auto me-auto border-info w-50 text-decoration-light' onClick={forgetpassMenu}>
          
            Forget Password?
      
          </a>
          </Link>
          <button type='button'   className='d-flex justify-content-center ms-auto me-auto bg-primary text-light border-light rounded-3 mt-3 mb-5 px-3 py-1' onClick={login}  >SIGN IN</button>
      
        </Form>
        {Error && <p  className="text-danger d-flex justify-content-center">{Error}</p>}
       
        </Col>
            )}
            </div>
        </Row>
     
    );
}