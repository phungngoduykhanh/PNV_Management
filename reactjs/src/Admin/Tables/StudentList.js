import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import axios from 'axios';
import { FaPhone, FaTrash } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from '../Tables/Tables.module.scss';
const cx = classNames.bind(styles);

function StudentList() {
    const [studentList, setStudentList] = useState([]);
    const [currentData, setCurrentData] = useState([]);

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

    // handle delete student
    const deleteStudent = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/delete-user/${id}`);

            const updatedList = studentList.filter(student => student.id !== id);
            setStudentList(updatedList);
            setCurrentData(updatedList);
        } catch (error) {
            console.error('Error deleting user:', error);
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
                                        <img className={cx("table-avatar")} src={student.image} alt="" />
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
                                <td className={cx("table-cell", "table-action")} onClick={() => deleteStudent(student.id)}>
                                    <FaTrash
                                        className={cx("table-info-icon")}
                                        style={{ fontSize: '1rem', color: 'rgba(255, 0, 0, 1)' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination data={studentList} pageSize={5} setCurrentData={setCurrentData} />
            </div>
        </div>
    );
}

export default StudentList;
