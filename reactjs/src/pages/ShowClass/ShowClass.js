import React, { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
library.add(faCog);

import classNames from 'classnames/bind';
import styles from './Showclass.module.scss';
const cx = classNames.bind(styles);

function ShowClass() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/classes')
            .then(response => response.json())
            .then(data => {
                // Lấy danh sách lớp học từ dữ liệu API
                const classList = data.map(classData => ({
                    classId: classData.class_id,
                    className: classData.className
                }));
                setClasses(classList);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleCardClick = (classId) => {
        // Chuyển hướng khi người dùng nhấp vào detail class
        window.location.href = `http://localhost:3001/detailclass/${classId}`;
    };

    return (
        <div className={cx('container-class')}>
            {classes.map(classData => (
                <div className={cx('card-class')} key={classData.classId}
                    onClick={() => handleCardClick(classData.classId)}
                >
                    <div className={cx('class-header')}>
                        <img src='https://assets-prd.ignimgs.com/2022/08/01/cameron-crovetti-1659376185203.jpg' alt='#' />
                        <span>{classData.className}</span>
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
