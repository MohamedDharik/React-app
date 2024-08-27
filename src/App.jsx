
import Login from './auth/Login.jsx'
import Dashboard from './auth/Dashboard.jsx'
import ResetPass from './auth/resetpassword.jsx'

import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
   <BrowserRouter basename='/React-app/'>
      <Routes>
        {/* <Route path='/' element={<Register/>}/> */}
        <Route path='/' element={<Login/>}/>
        
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/resetpassword' element={<ResetPass/>}/>
 
      </Routes>
   </BrowserRouter>
    </>
  )    
}
 
export default App;
