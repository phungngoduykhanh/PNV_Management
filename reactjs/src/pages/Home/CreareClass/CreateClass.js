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

    const handleTeacherSearchTermChange = async (event) => {
        const term = event.target.textContent;
        setTeacherSearchTerm(term);

        try {
            const results = await fetchUsers(term);
            setTeacherSearchResults(
                results.filter(
                    (user) =>
                        !selectedTeachers.find((selectedUser) => selectedUser.id === user.id) &&
                        user.role === "teacher"
                )
            );
        } catch (error) {
            console.error("Error searching teachers:", error);
            setTeacherSearchResults([]);
        }
    }

    const handleStudentSearchTermChange = async (event) => {
        const term = event.target.textContent;
        setStudentSearchTerm(term);

        try {
            const results = await fetchUsers(term);
            setStudentSearchResults(
                results.filter(
                    (user) =>
                        !selectedStudents.find((selectedUser) => selectedUser.id === user.id) &&
                        user.role === "student"
                )
            );
        } catch (error) {
            console.error("Error searching students:", error);
            setStudentSearchResults([]);
        }
    };
    const handleUserSelect = (user, role) => {
        if (role === "teacher") {
            setSelectedTeachers([...selectedTeachers, user]);
            setTeacherSearchTerm("");
        } else if (role === "student") {
            setSelectedStudents([...selectedStudents, user]);
            setStudentSearchTerm("");
        }
    };

    const handleCreateClass = () => {
        // Perform the necessary actions to create the class with selected users (teachers and students)
        console.log('Selected Teachers:', selectedTeachers);
        console.log('Selected Students:', selectedStudents);
        // Reset the selected users state and any other relevant state
        setSelectedTeachers([]);
        setSelectedStudents([]);
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
                        <input type="text" placeholder="Class name (required)" />
                    </div>
                    <div className="modal-window__input">
                        <div
                            className="search-input"
                            contentEditable
                            placeholder="Add Teacher"
                            readOnly
                            onInput={handleTeacherSearchTermChange}
                        />
                        {teacherSearchTerm && teacherSearchResults.length > 0 && (
                            <ul className="dropdown-menu">
                                {teacherSearchResults.map((user) => (
                                    <li key={user.id} onClick={() => handleUserSelect(user, 'teacher')}>
                                        <a href="#">{user.email}</a>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="selected-results">
                            {selectedTeachers.map((teacher) => (
                                <span key={teacher.id} className="selected-result">
                                    {teacher.email}
                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            setSelectedTeachers((prevTeachers) =>
                                                prevTeachers.filter((t) => t.id !== teacher.id)
                                            )
                                        }
                                    >
                                        X
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* <div className="modal-window__input">
                        <input
                            type="text"
                            placeholder="Add Student"
                            value={selectedStudents.map(user => user.email).join(', ')}
                            onChange={handleStudentSearchTermChange}
                        />
                        {studentSearchTerm && studentSearchResults.length > 0 && (
                            <ul className="dropdown-menu">
                                {studentSearchResults.map((user) => (
                                    <li key={user.id} onClick={() => handleUserSelect(user, 'student')}>
                                        <a href="#">{user.email}</a>
                                    </li>
                                ))}
                            </ul>
                        )}  
                    </div> */}
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

