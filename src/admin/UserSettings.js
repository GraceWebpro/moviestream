import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';

import { updatePassword } from 'firebase/auth';


function UserSettings() {
    const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const user = auth.currentUser;

    const handleSubmit = async(e) => {
        e.preventDefault();
      if(newPassword !== confirmPassword) {
          setError('Passwords do not match!');
          return;
      }
      try {
          await updatePassword(user, newPassword);
          setError(null);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
      } catch (error) {
          setError('Failed to update password!');
      }
    };

    return (
      <div className="upload-container">
        <h2>User Settings</h2>
        <p style={{ color: '#000' }}>Manage your account details here.</p>

        <form onSubmit={handleSubmit} className='form-container'>
                    <h2>Change Password</h2>
                    <label>Current Password:
                    <input 
                    type='password' 
                    value={currentPassword} 
                    onChange={ e => setCurrentPassword(e.target.value)} 
                    /></label>
                    <br />
                    <label>New Password:
                    <input            
                    type='password' 
                    value={newPassword} 
                    onChange={ e => setNewPassword(e.target.value)} 
                    /></label>
                    <br />
                    <label>Confirm Password:
                    <input            
                    type='password' 
                    value={confirmPassword} 
                    onChange={ e => setConfirmPassword(e.target.value)} 
                    /></label>
                    <br />
                    {error && <p style={{ color: 'red', marginBottom: '20px', }}>{error}</p>}
                    <button type='submit'>Update Password</button>
                </form>
      </div>
    );
  }
  
  export default UserSettings;
  