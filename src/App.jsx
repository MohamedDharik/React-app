// import Sidebar from './components/sidebar.jsx'
import Register from './Register/MainsignUp.jsx'
import Login from './Mainlogin/Mainlogin.jsx'
import Dashboard from './auth/Dashboard.jsx'
import Analytics from './auth/analysis.jsx'
import Campaign from './auth/campagian.jsx'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter , Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
   <BrowserRouter basename='/React-app/'>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/campaign' element={<Campaign/>}/>

      </Routes>
   </BrowserRouter>
    </>
  )    
}
 
export default App;
