import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    
    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };
    
    return (
        <div className="flex items-center justify-between p-4 bg-slate-900 text-gray-200">
            <div className="flex gap-4">
                <Link to="/">
                    <h1 className="text-2xl font-bold">Home</h1>
                </Link>
                <Link to="/times">
                    <h1 className="text-2xl font-bold">Time</h1>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">
                    Welcome, {user?.email || 'User'}
                </h1>
                
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
                >
                    Sign Out
                </button>
            </div>
        </div>
    )
}