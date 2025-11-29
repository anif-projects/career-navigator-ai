import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PrimaryEducation from './PrimaryEducation';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return (
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-primary mb-6">🚀 Career Navigator</h1>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-lg text-gray-700 mb-6">
                                Welcome to <strong>Career Navigator AI</strong>, your trusted companion for academic and career guidance! 🌟
                            </p>
                            <h3 className="text-xl font-semibold text-secondary mb-4">Purpose:</h3>
                            <ul className="space-y-3 text-gray-600 mb-8">
                                <li className="flex items-center">📚 Help students discover suitable <strong>subjects</strong></li>
                                <li className="flex items-center">🎓 Provide information about <strong>scholarships</strong></li>
                                <li className="flex items-center">🏫 Explore top <strong>colleges</strong></li>
                                <li className="flex items-center">💼 Find relevant <strong>job opportunities</strong></li>
                                <li className="flex items-center">💬 Ask the Chat Bot for personalized career advice</li>
                            </ul>
                            <p className="text-gray-500 italic">
                                Our platform ensures personalized and updated information to guide you at every step of your career journey. 🚀
                            </p>
                        </div>
                    </div>
                );
            case 'Primary Education':
                return <PrimaryEducation />;
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
