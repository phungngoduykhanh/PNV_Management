import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import axios from 'axios';
import { FaPhone, FaTrash, FaEdit } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from '../Tables/Tables.module.scss';
const cx = classNames.bind(styles);
import { Modal, Button } from 'react-bootstrap';
import EditUserModal from '../EditAdmin/EditUserModal';



function StudentList() {
    const [studentList, setStudentList] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [studentIdToDelete, setStudentIdToDelete] = useState(null);

    const [editStudentData, setEditStudentData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        img: '',
        role: '',
    });


    // call api show student
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
                const students = data.filter(user => user.role === "student" && user.status !== "delete");
                setStudentList(students);
                setCurrentData(students);
            } else {
                console.log('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // handle delete student show modal
    const deleteStudent = (id) => {
        setShowModal(true);
        setStudentIdToDelete(id);
    };

    // handle confirm delete
    const handleConfirmDelete = async () => {
        try {
            if (studentIdToDelete) {
                await axios.get(`http://127.0.0.1:8000/api/delete-user/${studentIdToDelete}`);

                const updatedList = studentList.filter(student => student.id !== studentIdToDelete);
                setStudentList(updatedList);
                setCurrentData(updatedList);
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    //------------ handle edit student-----------------------

    const showModalEdit = (student) => {
        setEditStudentData(student);
        setModalEdit(true);
    };

    const saveChanges = async (updatedStudent) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/update-user/${updatedStudent.id}`, updatedStudent);

            if (response.ok) {
                const updatedList = studentList.map((student) => {
                    if (student.id === updatedStudent.id) {
                        return { ...student, ...updatedStudent };
                    }
                    return student;
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
        fetchData();
    }, []);

    return (
        <div className={cx("container-Admin__table")}>
            <h1 className={cx("table-title")}>Student List</h1>
            <div className={cx("table-body")}>
                <table className={cx("table")} width="100%" cellSpacing={0}>
                    <thead>
                        <tr className={cx("table-row")}>
                            <th className={cx("table-header")}>Name</th>
                            <th className={cx("table-header")}>Email</th>
                            <th className={cx("table-header")}>Password</th>
                            <th className={cx("table-header")}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((student, index) => (
                            <tr className={cx("table-row")} key={index}>
                                <td className={cx("table-cell", "table-name")}>
                                    <div className={cx("table-cell-content")}>
                                        <img className={cx("table-avatar")} src={student.img} alt="" />
                                    </div>
                                    <div className={cx("table-cell-content", "table-info")}>
                                        <div className={cx("table-info-inner")}>
                                            <div className={cx("table-info-header")}>
                                                <h5 className={cx("table-info-title")}>{student.name}</h5>
                                            </div>
                                            <div className={cx("table-info-body")}>
                                                <ul className={cx("table-info-list")}>
                                                    <li className={cx("table-info-item")}>
                                                        <FaPhone
                                                            className={cx("table-info-icon")}
                                                            style={{ fontSize: '0.9rem', color: 'rgb(240, 240, 64)' }}
                                                        />
                                                        {student.phone}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className={cx("table-cell")}>{student.email}</td>
                                <td className={cx("table-cell")}>{student.password}</td>
                                <td className={cx("table-cell", "table-action")}>
                                    <FaTrash
                                        onClick={() => deleteStudent(student.id)}
                                        className={cx("table-info-icon")}
                                        style={{ fontSize: '1rem', color: 'rgba(255, 0, 0, 1)' }}
                                    />
                                    <FaEdit
                                        onClick={() => showModalEdit(student)}
                                        className={cx("table-info-icon")}
                                        style={{ fontSize: '1rem', color: 'rgba(0, 0, 255, 1)', marginLeft: '1rem' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination data={studentList} pageSize={5} setCurrentData={setCurrentData} />
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this student?</p>
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
    );
}

export default StudentList;
