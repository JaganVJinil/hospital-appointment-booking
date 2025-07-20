import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";
import Navbar from './Navbar';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User not authenticated');
      return;
    }

    axios.get('http://localhost:8000/profile/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      setProfile(response.data);
    })
    .catch((error) => {
      console.error(error);
      setError('Failed to fetch profile');
    });
  }, []);

  if (error) {
    return <div className="text-red-600 text-center mt-10 text-lg font-semibold">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-10 text-lg">Loading profile...</div>;
  }

  return (
  <div className="profile-container">
    <h2 className="profile-title">User Profile</h2>
    <div className="profile-item">
      <span>Name:</span> {profile.name || 'N/A'}
    </div>
    <div className="profile-item">
      <span>Date of Birth:</span> {profile.dob ? new Date(profile.dob).toLocaleDateString() : 'N/A'}
    </div>
    <div className="profile-item">
      <span>Address:</span> {profile.address || 'N/A'}
    </div>
    <div className="profile-item">
      <span>Contact No:</span> {profile.contact_no || 'N/A'}
    </div>
  </div>
);
};

export default Profile;
