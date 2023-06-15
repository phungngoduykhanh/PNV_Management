import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateClass() {
    const [teacherSearchTerm, setTeacherSearchTerm] = useState('');
    const [studentSearchTerm, setStudentSearchTerm] = useState('');
    const [teacherSearchResults, setTeacherSearchResults] = useState([]);
    const [studentSearchResults, setStudentSearchResults] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const fetchUsers = async (term) => {
        try {
            const response = await axios.get(`http://localhost:3000/users?search=${term}`);
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
        setStudentSearchResults([]);
    }, [studentSearchTerm]);

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
    const handleUserSelect = (user, role) => {
        if (role === 'teacher') {
            setSelectedTeachers([...selectedTeachers, user]);
            setTeacherSearchTerm('');
        } else if (role === 'student') {
            setSelectedStudents([...selectedStudents, user]);
            setStudentSearchTerm('');
        }
    };

    const handleCreateClass = async () => {
        // Prepare the data for the new class
        const className = document.getElementById('class-name-input').value;
        const newClass = {
            className,
            students: selectedStudents.map((student) => ({
                studentId: student.id,
                studentEmail: student.email,
            })),
            teachers: selectedTeachers.map((teacher) => ({
                teacherId: teacher.id,
                teacherName: teacher.email,
            })),
        };

        try {
            // Send a GET request to check if the className already exists
            const response = await axios.get(`http://localhost:3000/classes?className=${className}`);
            const existingClass = response.data.find((cls) => cls.className === className);

            if (existingClass) {
                console.error('Class name already exists:', className);
                // Display an error message or take appropriate action
                alert('Class name already exists. Please choose a different name.');
                return;
            }

            // Send a POST request to create the new class
            const createResponse = await axios.post('http://localhost:3000/classes', newClass);
            console.log('Created class:', createResponse.data);

            // Reset the selected users state and any other relevant state
            setSelectedTeachers([]);
            setSelectedStudents([]);
        } catch (error) {
            console.error('Error creating class:', error);
        }
    };



    return (
        <div>
            <div className="container-modal">
                <div className="container__interior">
                    <a className="btn" href="#open-modal">
                        <span>
                            <i className="fa-solid fa-plus" />
                        </span>
                        Add class
                    </a>
                </div>
            </div>
            <div id="open-modal" className="modal-window">
                <div className="modal-window__content">
                    <h1 className="modal-window__title">Create class</h1>
                    <div className="modal-window__input">
                        <input type="text" id="class-name-input" placeholder="Class name (required)" />
                    </div>
                    <div className="modal-window__input">
                        <input
                            type="text"
                            placeholder="Add Teacher"
                            value={teacherSearchTerm}
                            onChange={handleTeacherSearchTermChange}
                        />
                        {teacherSearchTerm && teacherSearchResults.length > 0 && (
                            <ul className="dropdown-menu">
                                {teacherSearchResults.map((user) => (
                                    <li key={user.id} onClick={() => handleUserSelect(user, 'teacher')}>
                                        <button>{user.email}</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="modal-window__input">
                        <input
                            type="text"
                            placeholder="Add Student"
                            value={studentSearchTerm}
                            onChange={handleStudentSearchTermChange}
                        />
                        {studentSearchTerm && studentSearchResults.length > 0 && (
                            <ul className="dropdown-menu">
                                {studentSearchResults.map((user) => (
                                    <li key={user.id} onClick={() => handleUserSelect(user, 'student')}>
                                        <button>{user.email}</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="modal-window__button">
                        <a href="#" className="modal-window__close">
                            Cancel
                        </a>
                        <a href="#" className="modal-window__create" onClick={handleCreateClass}>
                            Create
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default CreateClass;