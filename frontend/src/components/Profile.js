import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";
import Navbar from './Navbar';
import BackgroundWrapper from './BackgroundWrapper';

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
    <div>
      <Navbar />
      <BackgroundWrapper>
        <div style={styles.wrapper}>
          <div style={styles.card}>
            <h2 style={styles.title}>👤 User Profile</h2>

            <div style={styles.item}>
              <span style={styles.label}>Name:</span> {profile.name || 'N/A'}
            </div>
            <div style={styles.item}>
              <span style={styles.label}>Date of Birth:</span> {profile.dob ? new Date(profile.dob).toLocaleDateString() : 'N/A'}
            </div>
            <div style={styles.item}>
              <span style={styles.label}>Address:</span> {profile.address || 'N/A'}
            </div>
            <div style={styles.item}>
              <span style={styles.label}>Contact No:</span> {profile.contact_no || 'N/A'}
            </div>
          </div>
        </div>
      </BackgroundWrapper>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 80px)', // full screen minus navbar
    padding: '2rem',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'left',
    animation: 'fadeIn 0.6s ease-in-out',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#0066cc',
    fontWeight: 'bold',
  },
  item: {
    marginBottom: '1rem',
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginRight: '0.5rem',
  },
};

export default Profile;
