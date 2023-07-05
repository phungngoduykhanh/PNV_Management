import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Pagination from '../pagination/Pagination';
import classNames from 'classnames/bind';
import styles from './Tables.module.scss';
import axios from 'axios';
const cx = classNames.bind(styles);


function ChatRoomList() {
    const [roomList, setRoomList] = useState([]);
    const [currentData, setCurrentData] = useState([]);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const url = "http://127.0.0.1:8000/api/chatrooms";
        const headers = {
            'Authorization': 'Bearer ' + token
        };

        try {
            const response = await fetch(url, { headers });

            if (response.ok) {
                const data = await response.json();
                setRoomList(data);
                setCurrentData(data);
            } else {
                console.log('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteRoom = async (id) => {
        console.log(id)
        try {
            await axios.get(`http://127.0.0.1:8000/api/deleteChatroom/${id}`);
            const updatedRoom = roomList.filter(room => room.id !== id);

            setRoomList(updatedRoom);
            setCurrentData(updatedRoom);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    return (

        <div className={cx("container-Admin__table")}>
            <h1 className={cx("table-title")}>Chat Room List</h1>
            <div className={cx("table-body")}>
                <table className={cx("table")} width="100%" cellSpacing={0}>
                    <thead>
                        <tr className={cx("table-row")}>
                            <th className={cx("table-header")}>STT</th>
                            <th className={cx("table-header")}>Name</th>
                            <th className={cx("table-header")}>Avatar</th>
                            <th className={cx("table-header")}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((room, index) => (
                            <tr className={cx("table-row")} key={index}>
                                <td>{index + 1}</td>
                                <td className={cx("table-cell", "table-name_room")}>{room.chatroomname}</td>
                                <td className={cx("table-cell")}>
                                    <img className={cx("table-avatar__room")} src={room.img} alt="" />
                                </td>
                                <td className={cx("table-cell", "table-action")} >
                                    <FaTrash
                                        className={cx("table-info-icon")}
                                        style={{ fontSize: '1rem', color: 'rgba(255, 0, 0, 1)' }}
                                        onClick={() => deleteRoom(room.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination data={roomList} pageSize={5} setCurrentData={setCurrentData} />
            </div>
        </div>
    )
}

export default ChatRoomList;
