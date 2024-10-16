import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';
import { Button, Paper, TextField } from '@mui/material';
function Login() {
    const validationSchema = yup.object({
        email: yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });
    const navigate = useNavigate()
    const hasFormSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/admin/AdminLogin', {
                email: values.email,
                password: values.password
            })
            const data = response.data;
            if (data.status === 409) {
                toast.error(data.message || 'Something Went Wrong');
            }
            else if (data.status === 400) {
                toast.error(data.message || 'Something Went Wrong');
            }
            else {
                notify(() => navigate('/deshbord'));
                // notify(() => navigate(''));

                localStorage.setItem('token', response.data.token);
            }
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    }
    function notify(callback) {
        toast.success('Login Succesfully..!', { onClose: callback })
    }
    return (
        <>
            <Formik validationSchema={validationSchema} initialValues={{
                email: '',
                password: '',
            }}
                onSubmit={hasFormSubmit} >

                <div className=' main-container-reg pt-5'>
                    <div className="container-fluid d-flex justify-content-center login-form-main">

                        <Paper elevation={2} sx={{ width: 'auto' }}  >
                            <Form action="" className='main-form-div'>
                                <div style={{ display: 'flex', flexDirection: 'column' }} className='gap-3 p-3'>
                                    <p className='text-center fs-3'>Login Form</p>

                                    <Field as={TextField} name="email" label="Email Id" sx={{ marginBottom: '5px' }} />

                                    <ErrorMessage name='email' />

                                    <Field as={TextField} name="password" label="Password" sx={{ marginBottom: '5px' }} />

                                    <ErrorMessage name='password' />

                                    <Button variant="contained" type="submit" className='bg-dark'  >Login</Button>
                                    <ToastContainer />
                                    <div className='d-flex justify-content-end'>
                                        <span className='forgot-link'><Link to="/ForgotPasswordForm" className='text-decoration-none'>Forgot Password?</Link></span>
                                    </div>

                                    <p className=''>Don't have an account? <span><Link to="/" className='text-decoration-none'>Register Here</Link></span></p>

                                </div>
                            </Form>
                        </Paper>
                    </div>
                </div>
            </Formik>

        </>
    )
}

export default Login


