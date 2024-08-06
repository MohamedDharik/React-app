
import Register from './Register/MainsignUp.jsx'
import Login from './Mainlogin/Mainlogin.jsx'
import Dashboard from './auth/Dashboard.jsx'
import Analytics from './auth/analysis.jsx'
import Campaign from './auth/campagian.jsx'
import Broadcast from './auth/broadcast.jsx'
import Transaction from './auth/Transaction.jsx'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter , Route, Routes } from 'react-router-dom';

//  Amplify.configure(Awsconfig);
 
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
        <Route path='/broadcast' element={<Broadcast/>}/>
        <Route path='/transaction' element={<Transaction/>}/>
      </Routes>
   </BrowserRouter>
    </>
  )    
}
 
export default App;
