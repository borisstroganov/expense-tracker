// import { useState } from 'react'
import Login from './Login'
import Logout from './Logout'
import './App.css'
import { useAuth } from './AuthContext';

function App() {
  const { isAuthenticated, userToken } = useAuth();


  return (
    <>
      <h1>Expense Tracker</h1>
      <div className="card">
        <div>
          {isAuthenticated ? (
            <div>
              <p>User is authenticated with token: {userToken}</p>
              <Logout />
            </div>
          ) : (
            <div>
              <p>User is not authenticated</p>
              <Login />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
