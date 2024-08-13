import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Toast, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.jsx';
import { signOut } from './auth.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CognitoIdentityProviderClient, AdminCreateUserCommand, ListUsersCommand, AdminUpdateUserAttributesCommand } from "@aws-sdk/client-cognito-identity-provider";

function Dashboard() {
  const [showCard, setShowCard] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showstatus, setShowstatus] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editableData, setEditableData] = useState({});
  const navigate = useNavigate(false);

  const closestatus = () => {
    setShowstatus(!showstatus);
  };

  const client = new CognitoIdentityProviderClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'AKIAQEIP3LBJQ53IBTG2',
      secretAccessKey: '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'
    }
  });



  async function fetchUsers() {
    const params = {
      UserPoolId: 'us-east-1_3eVqiFQmC',
    };

    try {
      const command = new ListUsersCommand(params);
      const data = await client.send(command);
      return data.Users;
    } catch (err) {
      console.error('Error fetching users:', err);
      return [];
    }
  }
  async function loadUsers() {
    const user = await fetchUsers();
    setUsers(user);}

  useEffect(() => {
    loadUsers();
  },[]);
    
   

  const add = async () => {
    setShowstatus(!showstatus);

    const params = {
      UserPoolId: 'us-east-1_3eVqiFQmC',
      Username: newEmail,
      UserAttributes: [
        { Name: 'name', Value: newName },
        { Name: 'email', Value: newEmail },
        { Name: 'phone_number', Value: newPhoneNumber },
      ],
      TemporaryPassword: 'Admin#1234',
      MessageAction: 'SUPPRESS',
    };

    setNewEmail("");
    setNewName("");
    setNewPhoneNumber("");

    const command = new AdminCreateUserCommand(params);

    try {
      const data = await client.send(command);
      setMessage("User Created Successfully");
      await loadUsers();
      console.log('User created:', data);
    } catch (err) {
      setMessage("Failed to Create User, Invalid Parameters");
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

  const handleEditToggle = (user) => {
    if (editingUser === user.Username) {
      setEditingUser(null);
    } else {
      setEditingUser(user.Username);
      setEditableData({
        name: user.Attributes?.find(attr => attr.Name === 'name')?.Value || '',
        email: user.Attributes?.find(attr => attr.Name === 'email')?.Value || '',
        phone_number: user.Attributes?.find(attr => attr.Name === 'phone_number')?.Value || '',
      });
    }
  };

  const handleInputChange = (e) => {
    setEditableData({
      ...editableData,
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.phone_number]: e.target.value,
    });
  };

  const handleSave = async (username) => {
   
    try {
      const attributes = [
        { Name: 'name', Value: editableData.name },
        { Name: 'email', Value: editableData.email },
        { Name: 'phone_number', Value: editableData.phone_number },
      ];
      
      setEditingUser(null)
      const command = new AdminUpdateUserAttributesCommand({
        UserPoolId: 'us-east-1_3eVqiFQmC',
        Username: username,
        UserAttributes: attributes,
      });

      await client.send(command);

      console.log(`Successfully updated data for ${username}`);
      setMessage("User data updated successfully!")
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>  
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col className='col-10 card rounded-2 border vh-100 mt-2'>
          <span className='ms-auto me-auto'>
            <Toast show={showstatus} onClose={closestatus} className="flex-end d-flex">
              <Toast.Header>{message}</Toast.Header>
            </Toast>
          </span>
          <span className='d-flex flex-row'>
            <input className='form-control mt-2 ms-2 w-25' type='text' placeholder='Search...' />
            <button type='button' className='ms-1 mt-2 btn btn-outline-primary py-0 px-3'>Search</button>
            <button type='button' onClick={logout} className='ms-5 mt-2 flex-row d-flex justify-content-center btn btn-outline-primary px-3'>Logout</button>
          </span>
          <hr />
          <h3 className='mt-0 mb-2 ms-3 text-primary'>Dashboard</h3>
          <Row>
            <Col>
              <Button onClick={toggle} className='ms-3 mt-3 btn '>
                {showCard ? 'Hide' : 'Add User'}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              {showCard && (
                <Card className='border-light shadow p-3 mb-5 bg-white rounded d-flex flex-column align-items-center mt-5'>
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
                  <Button onClick={add} className='mt-3 mb-3 px-4 py-1 btn'>Add</Button>
                </Card>
              )}
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col className='col-1'></Col>
            <Col>
              <h4 className='d-flex text-success justify-content-center mb-3'>User Details</h4> 
              <div className="card d-flex flex-column justify-content-center mt-3">
                <table className="table table-hover table-striped table-alert">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => {
                      const nameatt = user.Attributes?.find(attr => attr.Name === 'name');
                      const emailatt = user.Attributes?.find(attr => attr.Name === 'email');
                      const phoneatt = user.Attributes?.find(attr => attr.Name === 'phone_number');

                      return (
                        <tr key={user.Username}>
                          <td>
                            {editingUser === user.Username ? (
                              <FormControl
                                type="text"
                                name="name"
                                value={editableData.name}
                                onChange={handleInputChange}
                              />
                            ) : (
                              nameatt ? nameatt.Value : "No value available"
                            )}
                          </td>
                          <td>
                            {editingUser === user.Username ? (
                              <FormControl
                                type="email"
                                name="email"
                                value={editableData.email}
                                onChange={handleInputChange}
                              />
                            ) : (
                              emailatt ? emailatt.Value : "No value available"
                            )}
                          </td>
                          <td>
                            {editingUser === user.Username ? (
                              <FormControl
                                type="text"
                                name="phone_number"
                                value={editableData.phone_number}
                                onChange={handleInputChange}
                              />
                            ) : (
                              phoneatt ? phoneatt.Value : "No value available"
                            )}
                          </td>
                          <td>
                            {editingUser === user.Username ? (
                              <Button className='btn btn-success px-4' onClick={() => handleSave(user.Username)}>Save</Button>
                            ) : (
                              <Button className='btn btn-primary px-4' onClick={() => handleEditToggle(user)}>Edit</Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Col>
            <Col className='col-1'></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
