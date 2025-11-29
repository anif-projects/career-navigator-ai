import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PrimaryEducation from './PrimaryEducation';
import SecondaryEducation from './SecondaryEducation';
import Undergraduate from './Undergraduate';
import Postgraduate from './Postgraduate';
import CareerPath from './CareerPath';
import Chatbot from '../components/Chatbot';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return (
                    <div className="max-w-6xl mx-auto space-y-10">
                        {/* Hero Section */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 text-white shadow-xl">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-pink-500 opacity-10 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <h1 className="text-xl md:text-2xl font-extrabold mb-2 tracking-tight">
                                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-pink-200">{localStorage.getItem('username') || 'Explorer'}</span>! 🚀
                                </h1>
                                <p className="text-blue-100 text-sm max-w-2xl mb-4 leading-relaxed">
                                    Your personalized journey to academic excellence and professional success starts here. Let's shape your future together.
                                </p>
                                <button
                                    onClick={() => setActiveTab('Career Path')}
                                    className="bg-white text-blue-600 px-4 py-1.5 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 text-xs"
                                >
                                    Start Your Journey
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Quick Stats / Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Profile Card */}
                            <div className="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xl shadow-inner">
                                            📊
                                        </div>
                                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">On Track</span>
                                    </div>
                                    <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Profile Completion</h3>
                                    <div className="flex items-end gap-2 mb-3">
                                        <span className="text-3xl font-black text-gray-800">85%</span>
                                        <span className="text-emerald-500 text-xs font-bold mb-1.5">Almost there!</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full w-[85%] shadow-lg"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Saved Colleges Card */}
                            <div className="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl shadow-inner">
                                            🏛️
                                        </div>
                                        <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Wishlist</span>
                                    </div>
                                    <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Saved Colleges</h3>
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-black text-gray-800">0</span>
                                        <span className="text-purple-500 text-xs font-bold mb-1.5">Start exploring</span>
                                    </div>
                                    <p className="text-gray-400 text-xs mt-3">Save your dream colleges to track them here.</p>
                                </div>
                            </div>
                        </div>

                        {/* Next Step Card - Isolated */}
                        <div className="group bg-gradient-to-r from-rose-500 to-pink-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden text-white">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-12 -mt-12 blur-3xl"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-lg backdrop-blur-sm border border-white/10">
                                            🎯
                                        </div>
                                        <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">Recommended Action</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1">Take Career Assessment</h3>
                                    <p className="text-pink-100 text-sm">Discover your perfect career path with our AI-powered assessment.</p>
                                </div>
                                <button className="w-full md:w-auto bg-white text-pink-600 px-6 py-3 rounded-xl font-bold hover:bg-pink-50 transition-colors shadow-lg text-sm whitespace-nowrap">
                                    Start Assessment
                                </button>
                            </div>
                        </div>

                        {/* Career Related Topics */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Explore Career Fields</h2>
                                <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 transition-colors text-sm">
                                    View All <span className="text-lg">→</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {[
                                    { title: 'Technology & IT', icon: '💻', desc: 'Software, Data Science, AI & Cyber Security', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
                                    { title: 'Medical & Health', icon: '🩺', desc: 'Doctors, Nursing, Pharmacy & Research', color: 'from-red-500 to-pink-500', bg: 'bg-red-50' },
                                    { title: 'Business & Finance', icon: '💼', desc: 'Management, Banking, Marketing & HR', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
                                    { title: 'Engineering', icon: '⚙️', desc: 'Civil, Mechanical, Electrical & Robotics', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50' },
                                    { title: 'Arts & Design', icon: '🎨', desc: 'Graphics, Fashion, Interior & Animation', color: 'from-purple-500 to-indigo-500', bg: 'bg-purple-50' },
                                    { title: 'Law & Governance', icon: '⚖️', desc: 'Judiciary, Corporate Law & Public Policy', color: 'from-slate-600 to-slate-800', bg: 'bg-slate-50' },
                                ].map((topic, index) => (
                                    <div key={index} className="group bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                                        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                        <div className={`w-12 h-12 rounded-xl ${topic.bg} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                            {topic.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">{topic.title}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed mb-3">{topic.desc}</p>
                                        <div className="flex items-center text-blue-600 font-medium text-xs opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                            Explore <span className="ml-1">→</span>
                                        </div>
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
            case 'CareerPath-Secondary':
                return <CareerPath level="secondary" />;
            case 'CareerPath-Undergraduate':
                return <CareerPath level="undergraduate" />;
            case 'Chat Bot':
                return (
                    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
                        <h1 className="text-2xl font-bold text-primary mb-4">🤖 Career AI Bot</h1>
                        <Chatbot isEmbedded={true} />
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
            <div className="flex-1 ml-64 flex flex-col">
                <main className="flex-1 overflow-y-auto p-8">
                    {renderContent()}
                </main>
                {activeTab !== 'Chat Bot' && <Chatbot />}
            </div>
        </div>
    );
};

export default Dashboard;
