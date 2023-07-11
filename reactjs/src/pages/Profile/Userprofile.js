
import React, { useEffect, useState } from "react";
// import classNames from 'classnames/bind';
// import styles from './Userprofile.module.scss';
// const cx = classNames.bind(styles);
import axios from "axios";
import "./Userprofile.css";
const UserProfile = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    img: "",
    role: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      axios
        .get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    console.log(user);
    axios
      .post(`http://127.0.0.1:8000/api/update-user/${user.id}`, user)
      .then((response) => {
        setUser(response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("http://127.0.0.1:8000/api/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const imageUrl = response.data.image_url;
        setUser((prevUser) => ({
          ...prevUser,
          img: imageUrl,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveImage = () => {
    axios
      .post(`http://127.0.0.1:8000/api/update-profile-image/${user.id}`, {
        img: user.img,
      })
      .then((response) => {
        console.log(response.data);
        // Handle success
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div class="my-container">
    <div className="main-content_">
      <div
        className="header_ pb-8_ pt-5_ pt-lg-8_ d-flex_ align-items-center_"
        style={{
          minHeight: 600,
          backgroundImage:
            "url(https://i.pinimg.com/originals/14/5e/86/145e8621363ba956ec3c3909aa15340d.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask_ bg-gradient-default_ opacity-8_" />
        <div className="container-fluid_ d-flex_ align-items-center_">
          <div className="row_">
            <div className="col-lg-7_ col-md-10_">
              <h1 className="display-2_ text-white_">Hello {user.name}</h1>
              <p className="text-white_ mt-0_ mb-5_">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks.
              </p>
              {editMode ? (
                <button className="btn_ btn-info_" onClick={handleSave}>
                  Save profile
                </button>
              ) : (
                <button className="btn_ btn-info_" onClick={handleEdit}>
                  Edit profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid_ mt--7_">
        <div className="row_">
          <div className="col-xl-4_ order-xl-2_ mb-5_ mb-xl-0_">
            <div className="card_ card-profile_ shadow_">
              <div className="row_ justify-content-center_">
                <div className="col-lg-3_ order-lg-2_">
                  <div className="card-profile-image_">
                    <img src={user.img} className="rounded-circle_" alt="Profile" />
                  </div>
                </div>
              </div>
              <div className="card-header_ text-center_ border-0_ pt-8_ pt-md-4_ pb-0_ pb-md-4_">
                <div className="d-flex_ justify-content-between_">
                
                
                </div>
              </div>
              <div className="card-body_ pt-0_ pt-md-4_">
                <div className="text-center_">
                  <h3>
                    {user.name}
                    <span className="font-weight-light">, {user.age}</span>
                  </h3>
                  <div className="h5_ font-weight-300_">
                    <i className="ni_ location_pin_ mr-2_" />
                    {user.address}
                  </div>
                  <div className="h5_ mt-4_">
                    <i className="ni_ business_briefcase-24_ mr-2_" />
                    {user.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8_ order-xl-1_">
            <div className="card_ bg-secondary_ shadow_">
              <div className="card-header_ bg-white border-0_">
                <div className="row_ align-items-center_">
                  <div className="col-8_">
                    <h3 className="mb-0_">My account</h3>
                  </div>
                  <div className="col-4_ text-right_">
                    <a href="#!" className="btn_ btn-sm_ btn-primary_">
                      Settings
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body_">
                <form>
                  <h6 className="heading-small_ text-muted mb-4_">
                    User information
                  </h6>
                  <div className="pl-lg-4_">
                    <div className="row_">
                      <div className="col-lg-6_">
                        <div className="form-group_ focused_">
                          <label
                            className="form-control-label_"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          {editMode ? (
                            <input
                              type="text"
                              id="input-username"
                              className="form-control_ form-control-alternative_"
                              placeholder="Username"
                              name="name"
                              value={user.name}
                              onChange={handleChange}
                            />
                          ) : (
                            <p>{user.name}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6_">
                        <div className="form-group_">
                          <label
                            className="form-control-label_"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          {editMode ? (
                            <input
                              type="email"
                              id="input-email"
                              className="form-control_ form-control-alternative_"
                              placeholder="jesse@example.com"
                              name="email"
                              value={user.email}
                              onChange={handleChange}
                            />
                          ) : (
                            <p>{user.email}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row_">
                      <div className="col-lg-6_">
                        <div className="form-group_ focused_">
                          <label
                            className="form-control-label_"
                            htmlFor="input-phone"
                          >
                            Phone
                          </label>
                          {editMode ? (
                            <input
                              type="text"
                              id="input-phone"
                              className="form-control_ form-control-alternative_"
                              placeholder="Phone"
                              name="phone"
                              value={user.phone}
                              onChange={handleChange}
                            />
                          ) : (
                            <p>{user.phone}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6_">
                        <div className="form-group_ focused_">
                          <label
                            className="form-control-label_"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          {editMode ? (
                            <input
                              type="text"
                              id="input-address"
                              className="form-control_ form-control-alternative_"
                              placeholder="Address"
                              name="address"
                              value={user.address}
                              onChange={handleChange}
                            />
                          ) : (
                            <p>{user.address}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;