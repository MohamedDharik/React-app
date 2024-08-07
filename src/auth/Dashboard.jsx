import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.jsx';
import { signOut } from './auth.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CognitoIdentityProviderClient, AdminCreateUserCommand } from "@aws-sdk/client-cognito-identity-provider";

function Dashboard() {
  const [showCard, setShowCard] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();

  const client = new CognitoIdentityProviderClient({
    region:'us-east-1',
    credentials: {
      accessKeyId: 'AKIAQEIP3LBJQ53IBTG2',
      secretAccessKey: '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'
    }
  });
   
  const add = async () => {

  
    const params = {
      UserPoolId: 'us-east-1_3eVqiFQmC',
      Username: newEmail,
      UserAttributes: [
        {
          Name:'name',
          Value: newName,
        },
        {
          Name: 'email',
          Value: newEmail,
        },
        {
          Name: 'phone_number',
          Value: newPhoneNumber,
        }
      ],
      TemporaryPassword: 'Admin#1234',
      MessageAction: 'SUPPRESS'
    };

    const command = new AdminCreateUserCommand(params);

    try {
      const data = await client.send(command);
      console.log('User created:', data);
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

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
                  <button onClick={add} className='mt-3 mb-3 w-25 btn btn-outline-primary'>Add</button>
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
