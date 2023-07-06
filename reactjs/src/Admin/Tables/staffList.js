import React, { useEffect, useState } from 'react';
import { FaPhone, FaTrash } from 'react-icons/fa';
import Pagination from '../pagination/Pagination';
import classNames from 'classnames/bind';
import styles from './Tables.module.scss';
import axios from 'axios';
const cx = classNames.bind(styles);

function StaffList() {
    const [staffList, setStaffList] = useState([]);
    const [currentData, setCurrentData] = useState([]);

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
    const deleteStaff = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/delete-user/${id}`);

            const updatedList = staffList.filter(staff => staff.id !== id);
            setStaffList(updatedList);
            setCurrentData(updatedList);
        } catch (error) {
            console.error('Error deleting user:', error);
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
                                        <img className={cx("table-avatar")} src={staff.image} alt="" />
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
                                <td className={cx("table-cell", "table-action")} onClick={() => deleteStaff(staff.id)}>
                                    <FaTrash
                                        className={cx("table-info-icon")}
                                        style={{ fontSize: '1rem', color: 'rgba(255, 0, 0, 1)' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination data={staffList} pageSize={5} setCurrentData={setCurrentData} />
            </div>
        </div>
    )
}
export default StaffList;