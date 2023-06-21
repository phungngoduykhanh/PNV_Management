import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./DetailClass.module.scss";
const cx = classNames.bind(styles);

function ShowStudent() {
  const [DetailClass, setDetailClass] = useState([]);

  useEffect(() => {
    //API show student từ class
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        // Lấy danh sách học sinh từ dữ liệu API
        const classList = data.map(classData => ({
          studentId: classData.id,
          studentName: classData.user_name
        }));
        setDetailClass(classList);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className={cx("container-student")}>
      {DetailClass.map(studentData => (
        <div className={cx("card-student")} key={studentData.studentId}>
          <div className={cx("student-header")}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
          <div className={cx("student-body")}>
            <img
              src="https://assets-prd.ignimgs.com/2022/08/01/cameron-crovetti-1659376185203.jpg"
              alt="#"
            />
            <span className={cx("student-title")}>{studentData.studentName}</span>
          </div>
          <div className={cx("student-footer")}>
            <div className={cx("student-message")}>Massage</div>
            <div className={cx("student-view")}>View</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowStudent;
