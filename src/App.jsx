
 import Register from './Register/MainsignUp.jsx'
 import Login from './Mainlogin/Mainlogin.jsx'
 import Dashboard from './auth/Dashboard.jsx'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Router  basename="/React-app/">
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} /> 
        
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  )    
}

export default App;
