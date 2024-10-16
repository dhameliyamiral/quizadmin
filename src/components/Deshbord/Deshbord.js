import React, { useState } from 'react'
import backgroundImage from '../../Image/background2.jpg';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'; 
const Deshbord = () => {

     const navigate = useNavigate(); // Create a navigate function

     const handleQustionClick= () => {
         navigate('/questions'); // Redirect to the Questions page
     };
     const handleCourseClick = ()=>{
        navigate('/Course');
     }
    return (
        <>
            <div>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand">NavBar</Link>
                    </div>
                </nav>
            </div>
            <div
                style={{
                    backgroundColor: 'black',
                }}
                className=' d-flex justify-content-center'
            >
                <div className="row w-100">
                    <div className="col-lg-4  d-flex justify-content-center" >
                        <div onClick={handleQustionClick} className="card mb-5 mt-5" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title fs-2"><FaQuestion />
                                </h5>
                                <h6 className="card-subtitle m-4 text-muted">Add New Questions</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4  d-flex justify-content-center ">
                        <div onClick={handleCourseClick} className="card mb-5 mt-5" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title fs-2"><GiNotebook />
                                </h5>
                                <h6 className="card-subtitle m-4 text-muted">Add New Course</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4  d-flex justify-content-center ">
                        <div className="card mb-5 mt-5" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title fs-2"><FaGraduationCap /></h5>
                                <h6 className="card-subtitle m-4 text-muted">All Student Result</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
        </>
    );
};

export default Deshbord;
