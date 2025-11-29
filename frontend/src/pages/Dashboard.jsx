import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PrimaryEducation from './PrimaryEducation';
import SecondaryEducation from './SecondaryEducation';
import Undergraduate from './Undergraduate';
import Postgraduate from './Postgraduate';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return (
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Welcome Banner */}
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
                            <h1 className="text-xl font-bold mb-2">Welcome back to Career Navigator! 🚀</h1>
                            <p className="text-blue-100 text-sm">
                                Your personalized journey to academic and professional success starts here.
                            </p>
                        </div>

                        {/* Quick Stats / Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-emerald-900">Profile Completion</h3>
                                    <span className="bg-white text-emerald-600 text-xs px-2 py-1 rounded-full shadow-sm">85%</span>
                                </div>
                                <div className="w-full bg-white rounded-full h-2.5">
                                    <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <p className="text-sm text-emerald-700 mt-2">Add your skills to reach 100%</p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-purple-900">Saved Colleges</h3>
                                    <span className="text-2xl text-purple-700">0</span>
                                </div>
                                <p className="text-sm text-purple-700">Explore colleges and save your favorites</p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-blue-900">Next Step</h3>
                                    <span className="bg-white text-blue-600 text-xs px-2 py-1 rounded-full shadow-sm">Action</span>
                                </div>
                                <p className="font-medium text-blue-800">Take Career Assessment</p>
                                <button className="text-sm text-blue-600 font-medium mt-2 hover:underline">Start Now &rarr;</button>
                            </div>
                        </div>

                        {/* Career Related Topics */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Career Fields</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { title: 'Technology & IT', icon: '💻', desc: 'Software, Data Science, AI & Cyber Security', color: 'bg-blue-50 text-blue-600' },
                                    { title: 'Medical & Health', icon: '🩺', desc: 'Doctors, Nursing, Pharmacy & Research', color: 'bg-red-50 text-red-600' },
                                    { title: 'Business & Finance', icon: '💼', desc: 'Management, Banking, Marketing & HR', color: 'bg-yellow-50 text-yellow-600' },
                                    { title: 'Engineering', icon: '⚙️', desc: 'Civil, Mechanical, Electrical & Robotics', color: 'bg-orange-50 text-orange-600' },
                                    { title: 'Arts & Design', icon: '🎨', desc: 'Graphics, Fashion, Interior & Animation', color: 'bg-purple-50 text-purple-600' },
                                    { title: 'Law & Governance', icon: '⚖️', desc: 'Judiciary, Corporate Law & Public Policy', color: 'bg-indigo-50 text-indigo-600' },
                                ].map((topic, index) => (
                                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
                                        <div className={`w-12 h-12 rounded-lg ${topic.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                                            {topic.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{topic.title}</h3>
                                        <p className="text-sm text-gray-500">{topic.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'Primary Education':
                return <PrimaryEducation />;
            case 'Secondary Education':
                return <SecondaryEducation />;
            case 'Undergraduate':
                return <Undergraduate />;
            case 'Postgraduate':
                return <Postgraduate />;
            case 'Chat Bot':
                return (
                    <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
                        <h1 className="text-2xl font-bold text-primary mb-4">🤖 Career AI Bot</h1>
                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-center text-gray-400">
                            Chat Interface Coming Soon... (Connect to Backend API)
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-primary mb-6">{activeTab}</h1>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-gray-500">
                            Content for {activeTab} will be displayed here.
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 ml-64 p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;
