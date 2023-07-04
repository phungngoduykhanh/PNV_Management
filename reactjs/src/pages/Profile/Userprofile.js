import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./User.css";
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

const UserProfile = () => {

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
  }, []);

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleRole = (e) => {
    const newRole = e.target.value;
    setUser(prevUser => ({
      ...prevUser,
      role: newRole
    }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    console.log(user);
    axios.post(`http://127.0.0.1:8000/api/update-user/${user.id}`, user)
      .then(response => {
        setUser(response.data);
        setEditMode(false); // Thay đổi editMode về giá trị ban đầu
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(URL.createObjectURL(file));

  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4">
            <MDBCardBody className="text-center">
              <label htmlFor="image-upload" className="d-block cursor-pointer">
                <MDBCardImage
                  src={user.img}
                  alt="avatar"
                  className="rounded-circle"
                  fluid
                />
              </label>
              {editMode && (
                <div className="d-flex justify-content-center mb-2">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="visually-hidden"
                    onChange={handleImageChange}
                  />
                </div>
              )}
              <p className="text-muted mb-1">
                {editMode ? (
                  <input
                    type="text"
                    className="form-control"
                    name="jobTitle"
                    value={user.name}
                    onChange={handleChange}
                  />
                ) : (
                  user.name
                )}
              </p>
              <p className="text-muted mb-4">
                {editMode ? (
                  <input
                    type="text"
                    className="form-control"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                  />
                ) : (
                  user.role
                )}
              </p>
            </MDBCardBody>
          </MDBCard>

          <MDBCard className="mb-4 mb-lg-0">
            <MDBCardBody className="p-0">
              <MDBListGroup flush className="rounded-3">
                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <MDBIcon fas icon="at fa-lg text-warning" />
                  <MDBCardText className="m-0"></MDBCardText>
                  <MDBCardText className="m-0 text-muted">{user.email}</MDBCardText>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <MDBIcon fas icon="phone fa-lg text-warning" />
                  <MDBCardText className="m-0"></MDBCardText>
                  <MDBCardText className="m-0 text-muted">{user.phone}</MDBCardText>
                </MDBListGroupItem>
                {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <MDBIcon fas icon="mobile-alt fa-lg text-warning" />
                  <MDBCardText className="m-0"></MDBCardText>
                  <MDBCardText className="m-0 text-muted">{user.}</MDBCardText>
                </MDBListGroupItem> */}
                <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <MDBIcon fas icon="map-marker-alt fa-lg text-warning" />
                  <MDBCardText className="m-0"></MDBCardText>
                  <MDBCardText className="m-0 text-muted">{user.address}</MDBCardText>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBCardText className="h4 mb-4">Personal Information</MDBCardText>
              <hr></hr>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Name :</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={user.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <MDBCardText>{user.name}</MDBCardText>
                  )}
                </MDBCol>
              </MDBRow>
              <hr></hr>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Email :</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <MDBCardText>{user.email}</MDBCardText>
                  )}
                </MDBCol>
              </MDBRow>
              <hr></hr>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Phone :</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    <MDBCardText>{user.phone}</MDBCardText>
                  )}
                </MDBCol>
              </MDBRow>

              <hr></hr>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Address :</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  {editMode ? (
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                    />
                  ) : (
                    <MDBCardText>{user.address}</MDBCardText>
                  )}
                </MDBCol>
              </MDBRow>
              <hr></hr>
              {editMode ? (
                <MDBBtn onClick={handleSave} color="success" className="me-2">
                  Save
                </MDBBtn>
              ) : (
                <MDBBtn onClick={handleEdit} color="primary" className="me-2">
                  Edit
                </MDBBtn>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </section>
  );
};

export default UserProfile;
