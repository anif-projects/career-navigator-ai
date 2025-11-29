import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const [expandedMenu, setExpandedMenu] = useState('Education');

    const menuItems = [
        { name: 'Home', icon: '🏠' },
        {
            name: 'Education',
            icon: '🎓',
            subItems: [
                { name: 'Primary Education', id: 'Primary Education' },
                { name: 'Secondary Education', id: 'Secondary Education' },
                { name: 'Undergraduate', id: 'Undergraduate' },
                { name: 'Postgraduate', id: 'Postgraduate' }
            ]
        },
        {
            name: 'Career Path',
            icon: '🚀',
            subItems: [
                { name: 'After 10th', id: 'CareerPath-Secondary' },
                { name: 'After Intermediate', id: 'CareerPath-Undergraduate' }
            ]
        },
        { name: 'Chat Bot', icon: '🤖' },
        { name: 'Settings', icon: '⚙️' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/');
    };

    const handleMenuClick = (item) => {
        if (item.subItems) {
            setExpandedMenu(expandedMenu === item.name ? null : item.name);
        } else {
            setActiveTab(item.name);
        }
    };

    return (
        <div className="w-64 bg-white h-screen shadow-lg flex flex-col fixed left-0 top-0 z-50">
            <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-primary">Career Navigator</h2>
                <p className="text-sm mt-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Welcome, {username}</p>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => handleMenuClick(item)}
                                className={`w-full flex items-center justify-between px-6 py-3 text-left transition-colors ${activeTab === item.name && !item.subItems
                                    ? 'bg-blue-50 text-primary border-r-4 border-primary font-semibold'
                                    : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:pl-7 transition-all duration-300'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                </div>
                                {item.subItems && (
                                    <span className="text-xs">
                                        {expandedMenu === item.name ? '▼' : '▶'}
                                    </span>
                                )}
                            </button>

                            {/* Sub-menu items */}
                            {item.subItems && expandedMenu === item.name && (
                                <ul className="bg-gray-50 py-2">
                                    {item.subItems.map((subItem) => (
                                        <li key={subItem.id}>
                                            <button
                                                onClick={() => setActiveTab(subItem.id)}
                                                className={`w-full flex items-center px-12 py-2 text-sm text-left transition-colors ${activeTab === subItem.id
                                                    ? 'text-primary font-semibold bg-blue-100/50'
                                                    : 'text-gray-500 hover:text-primary'
                                                    }`}
                                            >
                                                {subItem.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
