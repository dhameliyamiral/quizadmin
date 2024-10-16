import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { TextField, MenuItem } from '@mui/material';

const Questions = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editQuestionId, setEditQuestionId] = useState(null);
    const [editInitialValues, setEditInitialValues] = useState({
        Question: '',
        Option1: '',
        Option2: '',
        Option3: '',
        Option4: '',
        Answer: '',
        CoursesId: ''
    });

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const handleCloseEdit = () => {
        setShowEdit(false);
        setEditInitialValues({ Question: '', Option1: '', Option2: '', Option3: '', Option4: '', Answer: '', CoursesId: '' });
    };

    const handleShowEdit = (question) => {
        setEditInitialValues({
            Question: question.Question,
            Option1: question.Option1,
            Option2: question.Option2,
            Option3: question.Option3,
            Option4: question.Option4,
            Answer: question.Answer,
            CoursesId: question.CoursesId._id // Store only the course ID for editing
        });
        setEditQuestionId(question._id);
        setShowEdit(true);
    };

    const initialValues = {
        Question: '',
        Option1: '',
        Option2: '',
        Option3: '',
        Option4: '',
        Answer: '',
        CoursesId: ''
    };

    const handleSubmitAdd = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:5000/admin/AddQuestions', values);
            if (response.data.status === 200) {
                toast.success("Question added successfully");
                fetchQuestions();
                handleCloseAdd();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error adding question:", error);
            toast.error("An error occurred while adding the question.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitEdit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.put(`http://localhost:5000/admin/EditQuestion/${editQuestionId}`, values);
            if (response.data.status === 200) {
                toast.success("Question updated successfully");
                fetchQuestions();
                handleCloseEdit();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating question:", error);
            toast.error("An error occurred while updating the question.");
        } finally {
            setSubmitting(false);
        }
    };

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/GetCourses');
                if (response.data.status === 200) {
                    setCourses(response.data.data);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                toast.error("An error occurred while fetching courses.");
            }
        };
        fetchCourses();
    }, []);

    const [questions, setQuestions] = useState([]);
    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/GetQuestions');
            if (response.data.status === 200) {
                setQuestions(response.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
            toast.error("An error occurred while fetching questions.");
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const deleteQuestion = async (questionId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/admin/DeleteQuestion/${questionId}`);
            toast.success("Question deleted successfully");
            fetchQuestions();
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShowAdd} className="float-end">
                Add Question
            </Button>

            {/* Add Question Modal */}
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a New Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitAdd}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className='main-form-div'>
                                    <div style={{ display: 'flex', flexDirection: 'column' }} className='gap-3 p-3'>
                                        <p className='text-center fs-3'>Add Question Form</p>
                                        {/* Form Fields */}
                                        <Field as={TextField} name="Question" label="Question" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Question' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} name="Option1" label="Option 1" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Option1' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} name="Option2" label="Option 2" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Option2' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} name="Option3" label="Option 3" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Option3' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} name="Option4" label="Option 4" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Option4' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} name="Answer" label="Answer" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Answer' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} select name="CoursesId" label="Course ID" sx={{ marginBottom: '5px' }}>
                                            {courses.map(course => (
                                                <MenuItem key={course._id} value={course._id}>
                                                    {course.name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        <ErrorMessage name='CoursesId' component="div" style={{ color: 'red' }} />
                                        <Button variant="contained" type="submit" className='btn btn-primary' disabled={isSubmitting}>
                                            Add Question
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Question Modal */}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={editInitialValues}
                        enableReinitialize
                        onSubmit={handleSubmitEdit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className='main-form-div'>
                                    <div style={{ display: 'flex', flexDirection: 'column' }} className='gap-3 p-3'>
                                        <p className='text-center fs-3'>Edit Question Form</p>
                                        {/* Form Fields */}
                                        <Field as={TextField} name="Question" label="Question" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Question' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} name="Option1" label="Option 1" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Option1' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} name="Option2" label="Option 2" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Option2' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} name="Option3" label="Option 3" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Option3' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} name="Option4" label="Option 4" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Option4' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} name="Answer" label="Answer" sx={{ marginBottom: '5px' }} />
                                        <ErrorMessage name='Answer' component="div" style={{ color: 'red' }} />
                                        <Field as={TextField} select name="CoursesId" label="Course ID" sx={{ marginBottom: '5px' }}>
                                            {courses.map(course => (
                                                <MenuItem key={course._id} value={course._id}>
                                                    {course.name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        <ErrorMessage name='CoursesId' component="div" style={{ color: 'red' }} />
                                        <Button variant="contained" type="submit" className='btn btn-primary' disabled={isSubmitting}>
                                            Update Question
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <h2 className="text-center">Questions List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Question</th>
                        <th>Option 1</th>
                        <th>Option 2</th>
                        <th>Option 3</th>
                        <th>Option 4</th>
                        <th>Answer</th>
                        <th>Course</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question, index) => (
                        <tr key={question._id}>
                            <td>{index + 1}</td>
                            <td>{question.Question}</td>
                            <td>{question.Option1}</td>
                            <td>{question.Option2}</td>
                            <td>{question.Option3}</td>
                            <td>{question.Option4}</td>
                            <td>{question.Answer}</td>
                            <td>{question.CoursesId?.name}</td> {/* Display course name */}
                            <td>
                                <Button className="btn btn-warning" onClick={() => handleShowEdit(question)}>Edit</Button>
                                <Button className="btn btn-danger" onClick={() => deleteQuestion(question._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ToastContainer />
        </>
    );
};

export default Questions;
