import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/sidebar.jsx';
import { signOut, getCurrentUser, handleUpdateEmailAndNameAttributes} from './auth.js';

// import { updateUserAttributes,  UpdateUserAttributesOutput } from "aws-amplify/auth";



function Dashboard() {
  const [showCard, setShowCard] = useState(true);
  const [attribute, setAttribute] = useState({ name: '', phone_number: '' });
  const [message, setMessage] = useState('');

  const toggle = (e) => {
    e.preventDefault();
    setShowCard(!showCard);
  };

  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttribute((prevAttributes) => ({
      ...prevAttributes,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const user = getCurrentUser();
      if (user) {
        
        await handleUpdateEmailAndNameAttributes(attribute.name, attribute.phone_number);
        setMessage('Attributes updated successfully!');
      }
    } catch (error) {
      console.error('Error updating attributes:', error);
      setMessage('Failed to update attributes.');
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
                    onChange={handleChange} 
                    name="name" 
                    value={attribute.name} 
                    className='form mt-4 mb-3 form-control' 
                    placeholder='Enter name..' 
                  />
                  <input 
                    type="email"  
                    onChange={handleChange} 
                    name="email" 
                    value={attribute.email} 
                    className='mb-3 form-control ' 
                    placeholder='Enter email..' 
                  />
                  <input 
                    type="tel" 
                    onChange={handleChange} 
                    name="phone_number" 
                    value={attribute.phone_number} 
                    className='mb-3 form-control' 
                    placeholder='Enter phone number..' 
                  />
                  <button onClick={onSubmit} className='mt-3 mb-3 w-25 btn btn-outline-primary'>Add</button>
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
