import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    // State to hold the error message
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error when user starts typing again
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await axios.post("http://localhost:8080/api/users/login", formData);

            // Login Success
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = '/';

        } catch (err) {
            // ERROR HANDLING LOGIC
            if (err.response) {
                if (err.response.status === 401) {
                    setError("❌ Wrong Username or Password. Please try again.");
                } else {
                    setError("⚠️ Server Error. Please try again later.");
                }
            } else {
                setError("⚠️ Unable to connect to the server.");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow">
                        <div className="card-header bg-success text-white">
                            <h4>Login</h4>
                        </div>
                        <div className="card-body">

                            {/* ERROR ALERT BOX */}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-success w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;