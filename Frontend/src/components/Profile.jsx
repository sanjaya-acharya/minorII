import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        sessionStorage.clear();
        navigate('/');
        window.location.reload();
    };

    useEffect(()=>{handleLogout()}, [])

    return (
        <div>
            <h1>Profile</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
