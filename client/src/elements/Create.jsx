import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        dob: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

      
        const dobDate = values.dob.split('T')[0]; 

        axios.post('/add_user', { ...values, dob: dobDate })
            .then((res) => {
                navigate('/');
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container-fluid min-vh-100 bg-light py-4">
            <div className="container bg-white p-4 rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-primary">Add Student</h3>
                    <Link to="/" className="btn btn-success">Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={values.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={values.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={values.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="dob" className="form-label">DOB</label>
                        <input type="date" className="form-control" id="dob" name="dob" value={values.dob} onChange={handleChange} required />
                    </div>
                    <div className="form-group my-3 d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;
