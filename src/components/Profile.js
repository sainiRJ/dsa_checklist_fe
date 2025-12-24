import { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ email: payload.email || 'user@example.com' });
      } catch (e) {
        console.error('Error parsing token:', e);
      }
    }
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user && (
        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;

