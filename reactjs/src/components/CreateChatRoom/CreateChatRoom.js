import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './CreateChatRoom.module.scss';
const cx = classNames.bind(styles);

function CreateClass() {
    const [teacherSearchTerm, setTeacherSearchTerm] = useState('');
    const [studentSearchTerm, setStudentSearchTerm] = useState('');
    const [staffSearchTerm, setStaffSearchTerm] = useState('');
    const [teacherSearchResults, setTeacherSearchResults] = useState([]);
    const [staffSearchResults, setStaffSearchResults] = useState([]);
    const [studentSearchResults, setStudentSearchResults] = useState([]);
    const [selectedStaff, setSelectedStaffs] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [isInputValid, setIsInputValid] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [user,setUser] = useState();

    useEffect(()=>{
        const token = localStorage.getItem('token'); 
            if (token) {
                axios.get('http://127.0.0.1:8000/api/user', {
                    headers: {
                    Authorization: `Bearer ${token}`, 
                    },
                })
                .then(response => {
                    setUser(response.data);
                    console.log(user);
                })
                .catch(error => {
                    console.error(error);
                });
            }
    },[])

    // connect api to search users
    const fetchUsers = async (term) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/users/search/${term}/${user.id}`);
            return response.data.filter((user) =>
                user.email.toLowerCase().includes(term.toLowerCase())
            );
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

    useEffect(() => {
        setTeacherSearchResults([]);
    }, [teacherSearchTerm]);

    useEffect(() => {
        setStaffSearchResults([]);
    }, [staffSearchTerm])

    useEffect(() => {
        setStudentSearchResults([]);
    }, [studentSearchTerm]);

    useEffect(() => {
        checkInputValidity();
    }, [selectedTeachers, selectedStaff, selectedStudents, teacherSearchTerm, staffSearchTerm, studentSearchTerm]);

    // handle verify input value
    const checkInputValidity = () => {
        const roomNameInput = document.getElementById('class-name-input');
        const isroomNameValid = roomNameInput.value.trim() !== '';
        const isTeachersSelected = selectedTeachers.length > 0;
        const isStaffSelected = selectedStaff.length > 0;
        const isStudentsSelected = selectedStudents.length > 0;

        setIsInputValid(isroomNameValid && (isTeachersSelected || isStaffSelected || isStudentsSelected));
    };

    //handle teachers
    const handleTeacherSearchTermChange = async (event) => {
        const term = event.target.value;
        setTeacherSearchTerm(term);

        try {
            const results = await fetchUsers(term);
            setTeacherSearchResults(
                results.filter(
                    (user) =>
                        !selectedTeachers.find((selectedUser) => selectedUser.id === user.id) &&
                        user.role === 'teacher'
                )
            );
        } catch (error) {
            console.error('Error searching teachers:', error);
            setTeacherSearchResults([]);
        }
    };

    //handle staff
    const handleStaffSearchTermChange = async (event) => {
        const term = event.target.value;
        setStaffSearchTerm(term);

        try {
            const results = await fetchUsers(term);
            setStaffSearchResults(
                results.filter(
                    (user) =>
                        !selectedStaff.find((selectedUser) => selectedUser.id === user.id) &&
                        user.role === 'staff'
                )
            )
        } catch (error) {
            console.error("Error searching students:", error);
            setStaffSearchResults([]);
        }
    }

    //handle student
    const handleStudentSearchTermChange = async (event) => {
        const term = event.target.value;
        setStudentSearchTerm(term);

        try {
            const results = await fetchUsers(term);
            setStudentSearchResults(
                results.filter(
                    (user) =>
                        !selectedStudents.find((selectedUser) => selectedUser.id === user.id) &&
                        user.role === 'student'
                )
            );
        } catch (error) {
            console.error("Error searching students:", error);
            setStudentSearchResults([]);
        }
    };

    // handle choose user when search
    const handleUserSelect = (user, role) => {
        if (role === 'teacher') {
            setSelectedTeachers([...selectedTeachers, user]);
            setTeacherSearchTerm('');
        } else if (role === 'student') {
            setSelectedStudents([...selectedStudents, user]);
            setStudentSearchTerm('');
        } else {
            setSelectedStaffs([...selectedStaff, user]);
            setStaffSearchTerm('');
        }
    };

    const handleRemoveUser = (user, role) => {
        if (role === 'teacher') {
            const updatedTeachers = selectedTeachers.filter((teacher) => teacher.id !== user.id);
            setSelectedTeachers(updatedTeachers);
        } else if (role === 'student') {
            const updatedStudents = selectedStudents.filter((student) => student.id !== user.id);
            setSelectedStudents(updatedStudents);
        } else {
            const updatedStaffs = selectedStaff.filter((staff) => staff.id !== user.id);
            setSelectedStaffs(updatedStaffs);
        }
    };

    // handle create chat room
    const handleCreateChat = async () => {
        const roomName = document.getElementById('class-name-input').value;

        //-----Verification input value-----
        if (!isInputValid) {
            setIsInputValid(false);
            setIsFormSubmitted(true);
            return;
        }

        // Check if the room name is empty
        if (!roomName) {
            setIsFormSubmitted(true);
            return;
        }

        try {
            // Fetch the latest existingClasses data
            const response = await axios.get('http://127.0.0.1:8000/api/chatrooms');
            const existingClasses = response.data;

            // Check if the roomName already exists
            const existingClass = existingClasses.find((cls) => cls.roomName === roomName);

            if (existingClass) {
                document.getElementById('class-name-input').style.borderColor = "red";
                document.getElementById('class-name-error').innerText = 'Room name already exists. Please choose a different name.';
                return;
            }

            // Find the maximum class_id among the existing classes
            const maxClassId = existingClasses.length > 0 ? Math.max(...existingClasses.map((cls) => Number(cls.class_id))) : 0;

            // Generate the new class_id by incrementing the maximum value
            const classId = maxClassId + 1;

            // Prepare the data for the new class
            const newClass = {
                chatroomname: roomName,
                owner_id: user.id,
                emails : {
                    teacher_emails: selectedTeachers.map((teacher) => teacher.email),
                    student_emails: selectedStudents.map((student) => student.email),
                    staff_emails: selectedStaff.map((staff) => staff.email)
                } 
            };

            // Send a POST request to create the new class
            console.log(newClass);
            const createResponse = await axios.post('http://127.0.0.1:8000/api/create-chatroom', newClass);
            console.log('Created class:', createResponse.data);
            if (createResponse) {
                alert('Create room successful');
            }
            // Reset the selected users state and any other relevant state
            setSelectedStudents([]);
            setSelectedStaffs([]);
            setRoomName('');
            setIsInputValid(false);
            document.getElementById('class-name-error').innerText = ''; // Clear the error message
            window.location.reload(false);
        } catch (error) {
            console.error('Error creating class:', error);
            alert("Create class failed")
        }
    };

    // Handle change in room name input field
    const handleRoomNameChange = (event) => {
        const errorElement = document.getElementById('class-name-error');
        if (errorElement.innerText) {
            errorElement.innerText = ''; // Clear the error message
        }
        document.getElementById('class-name-input').style.borderColor = ''; // Reset the border color
        setRoomName(event.target.value);
    }

    // Replace with the homepage 
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx("container-modal")}>
                <div className={cx("container__interior")}>
                    <a className={cx("btn")} href={cx("#open-modal")}>
                        <span>
                            <i className={cx("fa-solid fa-plus")} />
                        </span>
                        Add Chat
                    </a>
                </div>
            </div>
            <div id={cx("open-modal")} className={cx("modal-window")}>
                <div className={cx("modal-window__content")}>
                    <h1 className={cx("modal-window__title")}>Create Chat Room</h1>
                    <div className={cx("modal-window__input")}>
                        <input
                            type="text"
                            id="class-name-input"
                            placeholder="Class name (required)"
                            value={roomName}
                            onChange={handleRoomNameChange}
                            style={{ borderColor: isFormSubmitted && !roomName ? "red" : "" }}
                        />
                        {isFormSubmitted && !roomName && (
                            <div className={cx("error-message")}>Please fill in the room name</div>
                        )}
                        <div id="class-name-error" className={cx("error-message")}></div>
                    </div>

                    <div className={cx("modal-window__input")}>
                        <input
                            type="text"
                            placeholder="Add Teacher"
                            value={teacherSearchTerm}
                            onChange={handleTeacherSearchTermChange}
                            style={{ borderColor: isFormSubmitted && !teacherSearchTerm && selectedTeachers.length ===0 ? "red" : "" }}
                        />
                        {isFormSubmitted && !teacherSearchTerm && selectedTeachers.length === 0 && (
                            <div className={cx("error-message")}>Please add teacher email</div>
                        )}
                        {teacherSearchTerm && teacherSearchResults.length > 0 && (
                            <ul className={cx("dropdown-menu")}>
                                {teacherSearchResults.map((user) => (
                                    <li key={user.id}>
                                        <button onClick={() => handleUserSelect(user, 'teacher')}>{user.email}</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className={cx('selected')}>
                            <ul className={cx('selected-results')}>
                                {selectedTeachers.map((teacher) => (
                                    <li className={cx('selected-results_email')} key={teacher.id}>
                                        <span>{teacher.email}</span>
                                        <button onClick={() => handleRemoveUser(teacher, 'teacher')}>X</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={cx("modal-window__input")}>
                        <input
                            type="text"
                            placeholder="Add Staff"
                            value={staffSearchTerm}
                            onChange={handleStaffSearchTermChange}
                            style={{ borderColor: isFormSubmitted && !staffSearchTerm && selectedStaff.length === 0 ? "red" : "" }}
                        />
                        {isFormSubmitted && !staffSearchTerm && selectedStaff.length === 0 && (
                            <div className={cx("error-message")}>Please add staff email</div>
                        )}
                        {staffSearchTerm && staffSearchResults.length > 0 && (
                            <ul className={cx("dropdown-menu")}>
                                {staffSearchResults.map((user) => (
                                    <li key={user.id}>
                                        <button onClick={() => handleUserSelect(user, 'staff')}>{user.email}</button>
                                    </li>
                                ))}
                            </ul>

                        )}
                        <div className={cx('selected')}>
                            <ul className={cx('selected-results')}>
                                {selectedStaff.map((staff) => (
                                    <li key={staff.id}>
                                        <span>{staff.email}
                                        </span>
                                        <button onClick={() => handleRemoveUser(staff, 'staff')}>X</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div className={cx("modal-window__input")}>
                        <input
                            type="text"
                            placeholder="Add Student"
                            value={studentSearchTerm}
                            onChange={handleStudentSearchTermChange}
                            style={{ borderColor: isFormSubmitted && !studentSearchTerm && selectedStudents.length === 0 ? "red" : "" }}
                        />
                        {isFormSubmitted && !studentSearchTerm && selectedStudents.length === 0 && (
                            <div className={cx("error-message")}>Please add student email</div>
                        )}
                        {studentSearchTerm && studentSearchResults.length > 0 && (
                            <ul className={cx("dropdown-menu")}>
                                {studentSearchResults.map((user) => (
                                    <li key={user.id}>
                                        <button onClick={() => handleUserSelect(user, 'student')}>{user.email}</button>
                                    </li>
                                ))}
                            </ul>

                        )}
                        <div className={cx('selected')}>
                            <ul className={cx('selected-results')}>
                                {selectedStudents.map((student) => (
                                    <li key={student.id}>
                                        <span>{student.email}
                                        </span>
                                        <button onClick={() => handleRemoveUser(student, 'student')}>X</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <div className={cx("modal-window__button")}>
                        <a onClick={handleCancel} className={cx("modal-window__close")}>
                            Cancel
                        </a>
       
                        <a
                            className={cx("modal-window__create")}
                            style={{
                                backgroundColor: isInputValid ? "rgba(53, 166, 242, 1)" : "",
                                color: isInputValid ? "white" : ""
                            }}
                            onClick={handleCreateChat}
                        >
                            Create
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}


export default CreateClass;