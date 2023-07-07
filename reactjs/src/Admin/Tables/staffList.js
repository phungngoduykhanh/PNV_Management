import React, { useEffect, useState } from 'react';
import { FaPhone, FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import Pagination from '../pagination/Pagination';
import { Modal, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Tables.module.scss';
import EditUserModal from '../EditAdmin/EditUserModal';
const cx = classNames.bind(styles);

function StaffList() {
    const [staffList, setStaffList] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [staffIdToDelete, setStaffIdToDelete] = useState(null);

    const [modalEdit, setModalEdit] = useState(false);


    const [editStudentData, setEditStudentData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        img: '',
        role: '',
    });



    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const url = "http://127.0.0.1:8000/api/Admin-user";
        const headers = {
            'Authorization': 'Bearer ' + token
        };

        try {
            const response = await fetch(url, { headers });

            if (response.ok) {
                const data = await response.json();

                // Xử lý dữ liệu ở đây
                const staffs = data.filter(user => user.role !== "student" && user.status !== "delete");
                setStaffList(staffs);
                setCurrentData(staffs);
            } else {
                console.log('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }; 


    // handle delete staff
    const deleteStaff = (id) => {
        setShowModal(true);
        setStaffIdToDelete(id);
    };

    // handle confirm delete
    const handleConfirmDelete = async () => {
        try {
            if (staffIdToDelete) {
                await axios.get(`http://127.0.0.1:8000/api/delete-user/${staffIdToDelete}`);

                const updatedList = staffList.filter(staff => staff.id !== staffIdToDelete);
                setStaffList(updatedList);
                setCurrentData(updatedList);
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    //------------ handle edit st-----------------------

    const showModalEdit = (staff) => {
        setEditStudentData(staff);
        setModalEdit(true);
    };


    const saveChanges = async (updatedStaff) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/update-user/${updatedStaff.id}`, updatedStaff);

            if (response.ok) {
                const updatedList = staffList.map((staff) => {
                    if (staff.id === updatedStaff.id) {
                        return { ...staff, ...updatedStaff };
                    }
                    return staff;
                });
                setStudentList(updatedList);
                setCurrentData(updatedList);
            } else {
                console.log('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={cx("container-Admin__table")}>
            <h1 className={cx("table-title")}>Staff List</h1>
            <div className={cx("table-body")}>
                <table className={cx("table")} width="100%" cellSpacing={0}>
                    <thead>
                        <tr className={cx("table-row")}>
                            <th className={cx("table-header")}>Name</th>
                            <th className={cx("table-header")}>Email</th>
                            <th className={cx("table-header")}>Password</th>
                            <th className={cx("table-header")}>Role</th>
                            <th className={cx("table-header")}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((staff, index) => (
                            <tr className={cx("table-row")} key={index}>
                                <td className={cx("table-cell", "table-name")}>
                                    <div className={cx("table-cell-content")}>
                                        <img className={cx("table-avatar")} src={staff.img} alt="" />
                                    </div>
                                    <div className={cx("table-cell-content", "table-info")}>
                                        <div className={cx("table-info-inner")}>
                                            <div className={cx("table-info-header")}>
                                                <h5 className={cx("table-info-title")}>{staff.name}</h5>
                                            </div>
                                            <div className={cx("table-info-body")}>
                                                <ul className={cx("table-info-list")}>
                                                    <li className={cx("table-info-item")}>
                                                        <FaPhone
                                                            className={cx("table-info-icon")}
                                                            style={{ fontSize: '0.9rem', color: 'rgb(240, 240, 64)' }}
                                                        />
                                                        {staff.phone}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className={cx("table-cell")}>{staff.email}</td>
                                <td className={cx("table-cell")}>{staff.password}</td>
                                <td className={cx("table-cell")}>
                                    <button
                                        className={cx("role-button", {
                                            "admin": staff.role === "admin",
                                            "teacher": staff.role === "teacher",
                                            "staff": staff.role === "staff"
                                        })}
                                    >
                                        {staff.role}
                                    </button>
                                </td>
                                <td className={cx("table-cell", "table-action")} >
                                    <FaTrash
                                        onClick={() => deleteStaff(staff.id)}
                                        className={cx("table-info-icon")}
                                        style={{ fontSize: '1rem', color: 'rgba(255, 0, 0, 1)' }} />
                                    <FaEdit
                                        onClick={() => showModalEdit(staff)}
                                        className={cx("table-info-icon")}
                                        style={{ fontSize: '1rem', color: 'rgba(0, 0, 255, 1)', marginLeft: '1rem' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination data={staffList} pageSize={5} setCurrentData={setCurrentData} />
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this staff?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleConfirmDelete()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <EditUserModal
                modalVisible={modalEdit}
                onHide={() => setModalEdit(false)}
                student={editStudentData}
                saveChanges={saveChanges}
            />
        </div>
    )
}
export default StaffList;