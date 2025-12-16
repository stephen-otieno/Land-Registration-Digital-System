import React, { useState } from 'react';
import { addLand } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddLand = () => {
    const navigate = useNavigate();
    // Get the logged-in user from storage
    const user = JSON.parse(localStorage.getItem("user"));

    const [formData, setFormData] = useState({
        ownerName: '',
        titleDeedNumber: '',
        location: '',
        size: '',
        county: '',
        applicant: { id: user ? user.id : null } // Link land to this user
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login first!");
            navigate('/login');
            return;
        }

        try {
            await addLand(formData);
            alert("Land Registered Successfully!");
            navigate('/'); // Go back to dashboard (we will build this next)
        } catch (error) {
            alert("Error registering land. Try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-dark text-white">
                    <h4>Register New Land</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Owner Full Name</label>
                                <input type="text" name="ownerName" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Title Deed Number</label>
                                <input type="text" name="titleDeedNumber" className="form-control" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Location/Village</label>
                                <input type="text" name="location" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Size (in Acres)</label>
                                <input type="number" step="0.01" name="size" className="form-control" onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label>County</label>
                            <input type="text" name="county" className="form-control" onChange={handleChange} required />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Submit Application</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddLand;