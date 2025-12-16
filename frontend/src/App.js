import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddLand from './components/AddLand';
import LandList from './components/LandList'; // <--- IMPORT THIS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Router>
            <div className="container mt-4">
                {/* Navbar */}
                <nav className="navbar navbar-light bg-light mb-4 px-3 rounded shadow-sm">
                    <Link className="navbar-brand fw-bold" to="/">Land Registry</Link>
                    <div>
                        {!user ? (
                            <>
                                <Link className="btn btn-outline-primary me-2" to="/register">Register</Link>
                                <Link className="btn btn-primary" to="/login">Login</Link>
                            </>
                        ) : (
                            <button className="btn btn-danger" onClick={() => {
                                localStorage.removeItem("user");
                                window.location.href = '/login';
                            }}>Logout {user.username}</button>
                        )}
                    </div>
                </nav>

                <Routes>
                    {/* UPDATED HOME ROUTE */}
                    <Route path="/" element={
                        user ? (
                            // Logged in: Show Dashboard
                            <LandList />
                        ) : (
                            // Not logged in: Show Welcome
                            <div className="text-center mt-5">
                                <h1>Welcome to the Land Registry</h1>
                                <p className="lead">Secure, Transparent, and Digital Land Management.</p>
                                <div className="mt-4">
                                    <Link to="/login" className="btn btn-lg btn-primary">Login to Dashboard</Link>
                                </div>
                            </div>
                        )
                    } />

                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/add-land" element={<AddLand />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;