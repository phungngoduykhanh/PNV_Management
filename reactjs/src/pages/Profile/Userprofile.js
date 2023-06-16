import React, { useState } from 'react';
import './Userprofile.css'; // Import the CSS file for styling

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Nguyen Thanh Tung',
    phone: '123-456-7890',
    email: 'tungmtp@example.com',
    address: 'Thai Binh',
    profileImageUrl: 'path_to_profile_image.jpg',
    status: 'Student', // Add the status property
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    console.log(user); // Displaying the updated user object
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUser({
        ...user,
        profileImageUrl: reader.result,
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="user-profile-edit">
      <div className="profile-image">
        <img src={user.profileImageUrl} alt="Profile" />
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        )}
       
      </div>
      <div className="user-info">
        <h2>My Profile</h2>
        {editMode ? (
            
          <form>
             <br />
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
              />
            </label>
            <br />
        
            <label>
              Status:
              <input
                type="text"
                name="status"
                value={user.status}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="button" onClick={handleSave}>
              Save
            </button>
          </form>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
<p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <p>
              <strong>Status:</strong> {user.status}
            </p>
            <br />
            
            <button type="button" onClick={handleEdit}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;