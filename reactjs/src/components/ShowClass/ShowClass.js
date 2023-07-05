import React, { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
library.add(faCog);

import classNames from 'classnames/bind';
import styles from './ShowClass.module.scss'; 
import axios from 'axios';
const cx = classNames.bind(styles);

function ShowClass() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        axios.get('http://127.0.0.1:8000/api/class', {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }).then(data => {
                console.log(data);
                setClasses(data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            }
            );
    }, []);

    const handleCardClick = (classId) => {
        // Chuyển hướng khi người dùng nhấp vào card
        window.location.href = `http://example/class/${classId}`;
    };


    return (
        <div className={cx('container-class')}>
            {classes.map(classData => (
                <div className={cx('card-class')} key={classData.id}
                    onClick={()=> handleCardClick(classData.id)}

                >
                    <div className={cx('class-header')}>
                        <img src={classData.img} alt='img' />
                        <span>{classData.classname}</span>
                    </div>
                    <div className={cx('class-body')}>
                        <a href="#"><FontAwesomeIcon icon={faCog} className={cx('class-icon')} /></a>
                    </div>
                </div>
            ))}
        </div>
);
}

export default ShowClass;