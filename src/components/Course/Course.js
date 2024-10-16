import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { TextField } from '@mui/material';
const Course = () => {

    const [show, setShow] = useState(false);
    const [courses, setCourses] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/GetCourses');
            if (response.data.status === 200) {
                setCourses(response.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("There was an error fetching the courses!", error);
            toast.error("An error occurred while fetching courses.");
        }
    };
    useEffect(()=>{
        fetchCourses();
},[])
    const handleCourseSubmit = async (values, { setSubmitting }) => {
        try {console.log("values = ",values);
        
            const response = await axios.post('http://localhost:5000/admin/AddCourses', { name: values.CourseName });
            console.log("Course response:", response);

            if (response.data.status === 200) {
                toast.success("add course successfully");
                handleClose();
                fetchCourses();
             // Close course form after successful submission
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("There was an error adding the course!", error);
            toast.error("An error occurred while adding the course.");
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <Button variant="primary" onClick={handleShow} className="float-end">
                Add Course
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Formik
                        initialValues={{ CourseName: '' }}
                        onSubmit={handleCourseSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field as={TextField} name="CourseName" label="Course Name" sx={{ marginBottom: '5px' }} />
                                <ErrorMessage name='CourseName' component="div" style={{ color: 'red' }} />
                                <Button variant="contained" type="submit" disabled={isSubmitting}>
                                    Add Course
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
            <div>
            {/* <h5>Course List</h5> */}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Course Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                 <>
                                {console.log("course",course)}
                              
                            
                                <tr key={course._id}>
                                    <td>{index + 1}</td>
                                    <td>{course.name}</td>
                                </tr>
                                </> 
                            ))}
                        </tbody>
                    </table>
            </div>
        </>
    );
};

export default Course;
