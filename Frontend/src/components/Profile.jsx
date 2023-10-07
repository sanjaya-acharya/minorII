import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user session
    sessionStorage.clear();

    // Navigate to the home page after logout
    navigate('/');
  };

  return (
    <div>
      <h1>Profile</h1>
      {/* Your profile content goes here */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
