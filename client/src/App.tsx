import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
// import Logout from './Logout'
import LandingPage from './pages/LandingPage';
import Navbar from './Navbar';
import Register from './pages/Register';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      {/* <div className='relative overscroll-none'> */}
        <Navbar />
        <Routes>
          <Route path="/" index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      {/* </div> */}
    </BrowserRouter>

  )
}

export default App
