import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Toast, FormControl, Button, Modal,Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import { CognitoIdentityProviderClient, AdminCreateUserCommand, ListUsersCommand, AdminUpdateUserAttributesCommand,AdminAddUserToGroupCommand } from "@aws-sdk/client-cognito-identity-provider";
import Swal from 'sweetalert2';

function Dashboard() {
  const [showCard, setShowCard] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showstatus, setShowstatus] = useState(false);
  const [newRole , setNewRole] =useState('');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editableData, setEditableData] = useState({});
  const navigate = useNavigate(false);



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
    
  const handleClose = () => setShowCard(false);
  const handleShow = () => setShowCard(true);

  const add = async () => {
    

    const params = {
      UserPoolId: 'us-east-1_3eVqiFQmC',
      Username: newEmail,
      UserAttributes: [
        { Name: 'name', Value: newName },
        { Name: 'email', Value: newEmail },
        { Name: 'phone_number', Value: newPhoneNumber },
        { Name: 'custom:Role', Value: newRole}
      ],
      TemporaryPassword: 'Admin*@1234',
      MessageAction: 'SUPPRESS',
    };

   

    const command = new AdminCreateUserCommand(params);
    
    try {
      const data = await client.send(command);
      Swal.fire({
        title: "User Details",
        text: "User added successfully",
        icon: "success"
      });
      setNewEmail("");
      setNewName("");
      setNewPhoneNumber("");
      setNewRole("");
      setShowCard(false)
      await loadUsers();
      console.log('User created:', data);
    } catch (err) {
      Swal.fire({
        title: "User Details",
        text: err.message,
        icon: "error"
      });
      await loadUsers();
      console.error('Error creating user:', err);
    }
    try{
    const groupParams = {
      UserPoolId: 'us-east-1_3eVqiFQmC',
      Username: newEmail,
      GroupName: newRole, 
    };

    switch (newRole) {
      case 'Admin':
        groupParams.GroupName = 'Admins';
        break;
      case 'User':
        groupParams.GroupName = 'Users';
        break;
      case 'SuperAdmin':
        groupParams.GroupName = 'SuperAdmin';
      default:
        Swal.fire({
          title: "User Details",
          text: ('Unknown role:', newRole),
          icon: "error"
        });
        console.error(newRole)
        return;
    }
    const addUserToGroupCommand = new AdminAddUserToGroupCommand(groupParams);
    await client.send(addUserToGroupCommand)
    Swal.fire({
      title: "User Details",
      text: (`User added to the ${groupParams.GroupName} group successfully.`),
      icon: "success"
    });
    console.log;
  } catch (error) {
    console.error("Error adding user:", error);
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
      Swal.fire({
        title: "User Update",
        text: "User data updated successfully",
        icon: "success"
      });
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
          <span className='d-flex flex-row'>
            <input className='form-control mt-2 ms-2 w-25' type='text' placeholder='Search...' />
            <Button type='button' className='ms-1 mt-2 btn  py-0 px-3'>Search</Button>
        
          </span>
          <hr />
          <h3 className='mt-0 mb-2 ms-3 text-primary'>Dashboard</h3>
          <Row>
            <Col>
            <Button variant="primary" onClick={handleShow}>
        Add Users
      </Button>

            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
       
            <Modal show={showCard} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            placeholder='Enter new phone number(+91)..' 
          />
          <input
          type="text" 
          value={newRole} 
          onChange={(e) => setNewRole(e.target.value)}
          className='mb-3 form-control' 
          placeholder='Enter your Role(User or Admin)..' 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={add}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
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
                      <th>Roles</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => {
                      const nameatt = user.Attributes?.find(attr => attr.Name === 'name');
                      const emailatt = user.Attributes?.find(attr => attr.Name === 'email');
                      const phoneatt = user.Attributes?.find(attr => attr.Name === 'phone_number');
                      const roleatt = user.Attributes?.find(attr => attr.Name === 'custom:Role')
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
                           {emailatt ? emailatt.Value :"No value available"}
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
                           {roleatt ? roleatt.Value :"No value available"}
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
