import { Link } from 'react-router-dom';



export default function Navbar() {
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
            
        </div>
    )
}