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

        try {
            // Send a GET request to retrieve the existing classes
            const response = await axios.get('http://localhost:3000/classes');
            const existingClasses = response.data;

            // Find the maximum class_id among the existing classes
            const maxClassId = existingClasses.length > 0 ? Math.max(...existingClasses.map((cls) => Number(cls.class_id))) : 0;

            // Generate the new class_id by incrementing the maximum value
            const classId = maxClassId + 1;

            // Prepare the data for the new class
            const newClass = {
                class_id: classId,
                className: className,
                teacher_emails: selectedTeachers.map((teacher) => teacher.email),
                student_emails: selectedStudents.map((student) => student.email),
            };

            // Check if the className already exists
            const existingClass = existingClasses.find((cls) => cls.className === className);
          
            if (existingClass) {
                console.error('Class name already exists:', className);
                alert('Class name already exists. Please choose a different name.');
                window.location.href = 'http://localhost:3001/#open-modal';
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
                                    <li key={user.id}>
                                        <button onClick={() => handleUserSelect(user, 'teacher')}>{user.email}</button>
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
                                    <li key={user.id}>
                                        <button onClick={() => handleUserSelect(user, 'student')}>{user.email}</button>
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