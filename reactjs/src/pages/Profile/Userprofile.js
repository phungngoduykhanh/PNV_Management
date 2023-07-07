import React, { useEffect, useState } from 'react';
import './Userprofile.css'; // Import the CSS file for styling
import axios from 'axios';

const UserProfileEdit = () => {

  const [user, setUser] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    img: '',
    role: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      axios
        .get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [])

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRole = (e) => {
    const newRole = e.target.value;
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, role: newRole };
      console.log(newRole);
      console.log(updatedUser);
      return updatedUser;
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    console.log(user);
    axios.post(`http://127.0.0.1:8000/api/update-user/${user.id}`, user)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(URL.createObjectURL(file));
    // reader.onload = () => {
    //   setUser({
    //     ...user,
    //     img: ,
    //   });
  };

  return (
    <div className="user-profile-edit">
      <div className="profile-image">
        <img src={user.img} alt="Profile" />
        {editMode && (
          <input
            type="file"
            onChange={handleImageChange}
          />
        )}
      </div>
      <div className="user-info">
        <h2>My Profile</h2>
        {editMode ? (
          <form>
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
              <select value={user.role} name="role" id="role" onChange={handleRole}>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
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
              <strong>Role:</strong> {user.role}
            </p>
            <button type="button" onClick={handleEdit}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfileEdit;
