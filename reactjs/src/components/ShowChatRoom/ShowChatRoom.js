import React, { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
library.add(faCog);

import classNames from 'classnames/bind';
import styles from './ShowChatRoom.module.scss'; 
import axios from 'axios';
const cx = classNames.bind(styles);

function ShowChatRoom() {
    const navigate = useNavigate();
    const [chatroom, setChatroom] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        console.log(token);
        axios.get('http://127.0.0.1:8000/api/chatroom', {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }).then(data => {
                setChatroom(data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            }
            );
    }, []);

    const handleCardClick = (chatroomId) => {
        // Chuyển hướng khi người dùng nhấp vào card
        navigate(`/chatroom/${chatroomId}`);
    };


    return (
        <div className={cx('container-chatroom')}>
            {chatroom.map(chatroomData => (
                <div className={cx('card-chatroom')} key={chatroomData.id}
                    onClick={()=> handleCardClick(chatroomData.id)}

                >
                    <div className={cx('chatroom-header')}>
                        <img src={chatroomData.img} alt='img' />
                        <span>{chatroomData.chatroomname}</span>
                    </div>
                    <div className={cx('chatroom-body')}>
                        <a href="#"><FontAwesomeIcon icon={faCog} className={cx('class-icon')} /></a>
                    </div>
                </div>
            ))}
        </div>
);
}

export default ShowChatRoom;