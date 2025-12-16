import React, { useEffect, useState } from 'react';
import { getAllLands, approveLand, rejectLand, deleteLand } from '../services/api';
import { Link } from 'react-router-dom';

const LandList = () => {
    const [lands, setLands] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        loadLands();
    }, []);

    const loadLands = async () => {
        try {
            const response = await getAllLands();
            if (user.role === 'USER') {
                // Users only see their own applications
                const myLands = response.data.filter(land => land.applicant && land.applicant.id === user.id);
                setLands(myLands);
            } else {
                // Officers and Admins see ALL records
                setLands(response.data);
            }
        } catch (error) {
            console.error("Error loading lands:", error);
        }
    };

    const handleApprove = async (id) => {
        if(window.confirm("Approve this Title Deed?")) {
            await approveLand(id);
            loadLands();
        }
    };

    const handleReject = async (id) => {
        if(window.confirm("Reject this application?")) {
            await rejectLand(id);
            loadLands();
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Permanently delete this application?")) {
            await deleteLand(id);
            loadLands();
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{user.role === 'USER' ? 'My Applications' : `${user.role} Dashboard`}</h2>

                {/* RESTRICTION: Only USER can register land. Admin/Officer cannot. */}
                {user.role === 'USER' && (
                    <Link to="/add-land" className="btn btn-success">+ Register New Land</Link>
                )}
            </div>

            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-hover table-striped align-middle">
                        <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Owner</th>
                            <th>Title Deed</th>
                            <th>Location</th>
                            <th>Size</th>
                            <th>Status</th>
                            {/* RESTRICTION: Admin sees NO Actions column. Only User & Officer do. */}
                            {user.role !== 'ADMIN' && <th>Actions</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {lands.map((land) => (
                            <tr key={land.id}>
                                <td>{land.id}</td>
                                <td>{land.ownerName}</td>
                                <td>{land.titleDeedNumber}</td>
                                <td>{land.location}</td>
                                <td>{land.size} Acres</td>
                                <td>
                                        <span className={`badge ${
                                            land.status === 'APPROVED' ? 'bg-success' :
                                                land.status === 'REJECTED' ? 'bg-danger' : 'bg-warning text-dark'
                                        }`}>
                                            {land.status}
                                        </span>
                                </td>

                                {/* ACTIONS COLUMN CONTENT */}
                                {user.role !== 'ADMIN' && (
                                    <td>
                                        {/* OFFICER: Approve/Reject */}
                                        {user.role === 'OFFICER' && land.status === 'PENDING' && (
                                            <>
                                                <button onClick={() => handleApprove(land.id)} className="btn btn-sm btn-outline-success me-2">Approve</button>
                                                <button onClick={() => handleReject(land.id)} className="btn btn-sm btn-outline-danger">Reject</button>
                                            </>
                                        )}

                                        {/* USER: Cancel (Delete) Application */}
                                        {user.role === 'USER' && land.status === 'PENDING' && (
                                            <button onClick={() => handleDelete(land.id)} className="btn btn-sm btn-secondary">
                                                Cancel App
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {lands.length === 0 && <div className="text-center mt-3">No records found.</div>}
                </div>
            </div>
        </div>
    );
};

export default LandList;