import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const menuItems = [
        { name: 'Home', icon: '🏠' },
        { name: 'Primary Education', icon: '📚' },
        { name: 'Secondary Education', icon: '📖' },
        { name: 'Undergraduate Education', icon: '🎓' },
        { name: 'Postgraduate Education', icon: '📜' },
        { name: 'Career Path', icon: '🚀' },
        { name: 'Chat Bot', icon: '🤖' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div className="w-64 bg-white h-screen shadow-lg flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-primary">Career Navigator</h2>
                <p className="text-sm text-gray-500 mt-1">Welcome, {username}</p>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => setActiveTab(item.name)}
                                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${activeTab === item.name
                                        ? 'bg-blue-50 text-primary border-r-4 border-primary font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
