import React, { useEffect, useState } from 'react';
import { Modal, Button} from 'react-bootstrap';
import { storage } from '../../Firebase/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';


function EditUserModal({ modalVisible, onHide, student, saveChanges }) {
    const [editedStudent, setEditedStudent] = useState(student);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        setEditedStudent(student);
    }, [student]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };


    const handleRole = (e) => {
        const newRole = e.target.value;
        setEditedStudent((prevUser) => {
            const updatedUser = { ...prevUser, role: newRole };
            console.log(newRole);
            console.log(updatedUser);
            return updatedUser;
        });
    };

    const handleSaveChanges = () => {
        if (imageFile) {
            uploadImage(imageFile);
        } else {
            setEditedStudent((prevStudent) => {
                console.log(prevStudent);
                const updatedStudent = { ...prevStudent };
                saveChanges(updatedStudent)
                    .then(() => {
                        toast.success('Thay đổi đã được lưu thành công');
                        onHide();
                    })
                    .catch((error) => {
                        toast.error('Lưu thay đổi thất bại');
                        console.log(error);
                    });
                return updatedStudent;
            });
        }
    };


    const uploadImage = (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        uploadBytes(storageRef, file)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
                const updatedStudent = {
                    ...editedStudent,
                    img: url
                };
                setEditedStudent(updatedStudent);
                toast.success('Thay đổi đã được lưu thành công');
                setTimeout(() => {
                    saveChanges(updatedStudent);
                    onHide();
                    console.log(updatedStudent);
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    // if student is null, not show modal
    if (student === null) {
        return null;
    }

    return (
        <Modal show={modalVisible} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={editedStudent.name || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={editedStudent.email || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={editedStudent.phone || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={editedStudent.address || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            className="form-control"
                            id="role"
                            name="role"
                            value={editedStudent.role || ''}
                            onChange={handleRole}
                        >
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">
                            <input
                                type="file"
                                name="image"
                                id="image"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <img className="form-control__img" src={imageUrl || editedStudent.img || ''} alt="Profile" />
                        </label>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>

            <ToastContainer />

        </Modal>
    );

}

export default EditUserModal;
