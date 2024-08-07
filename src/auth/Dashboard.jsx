import React, {  useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.jsx';
import { signOut } from './auth.js';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { poolData } from './Userpool.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AWS} from 'aws-sdk'


function Dashboard() {
  const [showCard, setShowCard] = useState(false);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [newName, setNewName] = useState('');
  const[currentEmail , setCurrentEmail]=useState('')
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // const data = {
  //   UserPoolId: poolData.UserPoolId,
  //   ClientId: poolData.ClientId,
  // };

  // const userPool = new CognitoUserPool(data);
  // const currentUser = userPool.getCurrentUser();

  // const isAuthenticated = () => currentUser !== null;

  // const handleUpdateAttributes = () => {
  //   if (isAuthenticated()) {
  //     currentUser.getSession((err, session) => {
  //       if (err) {
  //         console.error('Error getting session:', err);
  //         return;
  //       }
  //       if (!session.isValid()) {
  //         console.error('Session is not valid');
  //         return;
  //       }

  //       const attributeList = [];

  //       if (currentPhoneNumber !== newPhoneNumber) {
  //         const phoneAttribute = new CognitoUserAttribute({
  //           Name: 'phone_number',
  //           Value: newPhoneNumber,
  //         });
  //         attributeList.push(phoneAttribute);
  //       }

  //       if (currentName !== newName) {
  //         const nameAttribute = new CognitoUserAttribute({
  //           Name: 'name',
  //           Value: newName,
  //         });
  //         attributeList.push(nameAttribute);
  //       }
  //       if(currentEmail !== newEmail){
  //         const emailAttribute =new CognitoUserAttribute({
  //           Name:'email',
  //           Value:newEmail,
  //         });
  //         attributeList.push(emailAttribute)
  //       }

  //       if (attributeList.length > 0) {
  //         currentUser.updateAttributes(attributeList, (err, result) => {
  //           if (err) {
  //             console.error('Error updating attributes:', err);
  //           } else {
  //             setMessage('Attributes updated successfully');
  //             console.log('Attributes updated successfully:', result);
  //           }
  //         });
  //       } else {
  //         console.log('No attributes to update');
  //       }
  //     });
  //   }
  // };


 const cognito = new AWS.CognitoIdentityServiceProvider();
 const add = ()=>{
  const params = {
    UserPoolId: 'us-east-1_3eVqiFQmC', 
    Username: newName, 
    UserAttributes: [
      {
        Name: 'email',
        Value: newEmail,
      },
      {
        Name: 'phone_number',
        Value: newPhoneNumber,
      }
    ],
    TemporaryPassword: 'Admin@1234',
    MessageAction: 'SUPPRESS'
  };
  
  cognito.adminCreateUser(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log('User created:', data);
    }
  });
}
  
  



  const toggle = (e) => {
    e.preventDefault();
    setShowCard(!showCard);
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>  
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col className='col-10 card rounded-2 border vh-100 mt-2'>
          <span className='d-flex flex-row'>
            <input className='form-control mt-2 ms-2 w-25' type='text' placeholder='Search...' />
            <button type='button' className='ms-1 mt-2 btn btn-outline-primary py-0 px-3'>Search</button>
            <button type='button' onClick={logout} className='ms-5 mt-2 flex-row d-flex justify-content-center btn btn-outline-primary px-3'>Logout</button>
          </span>
          <hr />
          <h3 className='mt-0 mb-2 ms-3 text-primary'>Dashboard</h3>
          <Row>
            <Col>
              <button onClick={toggle} className='ms-3 mt-3 flex-row d-flex justify-content-center btn btn-outline-primary'>
                {showCard ? 'Hide' : 'Add User'}
              </button>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              {showCard && (
                <Card className='Card border-light shadow p-3 mb-5 bg-white rounded d-flex flex-column align-items-center mt-5'>
                  <h5>User Details</h5>
                  {/* <input 
                    type="tel" 
                    value={currentPhoneNumber} 
                    onChange={(e) => setCurrentPhoneNumber(e.target.value)}
                    className='mb-3 form-control' 
                    placeholder='Enter current phone number..' 
                  /> */}
                  <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    className='mb-3 form-control' 
                    placeholder='Enter new name..' 
                  />
                  <input 
                    type="email" 
                    value={newEmail} 
                    onChange={(e) => setNewEmail(e.target.value)}
                    className='mb-3 form-control' 
                    placeholder='Enter new Email..' 
                  />
                  <input 
                    type="tel" 
                    value={newPhoneNumber} 
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    className='mb-3 form-control' 
                    placeholder='Enter new phone number..' 
                  />
                  {/* <input 
                    type="text" 
                    value={currentName} 
                    onChange={(e) => setCurrentName(e.target.value)}
                    className='mb-3 form-control' 
                    placeholder='Enter current name..' 
                  /> */}
                  
                  <button onClick={add} className='mt-3 mb-3 w-25 btn btn-outline-primary'>Add</button>
                  {message && <p>{message}</p>}
                </Card>
              )}
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
