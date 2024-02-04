import React from 'react';
import { useAuth } from './AuthContext';

const Logout: React.FC = () => {
  const { logoutContext } = useAuth();

  const handleLogout = () => {
    logoutContext();
  };

  return (
    <div>
      <button className='btn' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
