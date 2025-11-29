import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PrimaryEducation from './PrimaryEducation';
import SecondaryEducation from './SecondaryEducation';
import Undergraduate from './Undergraduate';
import Postgraduate from './Postgraduate';
import CareerPath from './CareerPath';
import Settings from './Settings';
import Chatbot from '../components/Chatbot';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return (
                    <div className="max-w-7xl mx-auto">
                        {/* Bento Grid Container */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">

                            {/* 1. Hero Section (Spans 2 columns) */}
                            <div className="md:col-span-2 relative overflow-hidden rounded-2xl bg-white p-4 shadow-lg border border-gray-100 flex flex-col justify-center min-h-[180px] group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-50 to-pink-50 rounded-full -ml-10 -mb-10"></div>

                                <div className="relative z-10">
                                    <div className="flex flex-col gap-2 mb-3">
                                        <div className="flex flex-wrap items-baseline gap-2 text-gray-900">
                                            <h1 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                                                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{localStorage.getItem('username') || 'Explorer'}</span>.
                                            </h1>
                                            <p className="text-gray-500 text-xs font-medium leading-relaxed">
                                                Ready to design your future? Your personalized roadmap to success is just a click away.
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 w-fit shadow-sm">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                            </span>
                                            AI-Powered Career Guidance
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setActiveTab('Career Path')}
                                            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-1.5 rounded-lg font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 text-xs"
                                        >
                                            Start Journey
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                        </button>
                                        <button className="px-4 py-1.5 rounded-lg font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all duration-300 text-xs">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Profile Intelligence (Vertical Card) */}
                            <div className="md:col-span-1 bg-white p-3 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200 text-white text-xl">
                                            📊
                                        </div>
                                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-emerald-100">On Track</span>
                                    </div>
                                    <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Profile Status</h3>
                                    <div className="flex items-baseline gap-1.5 mb-1">
                                        <span className="text-3xl font-black text-gray-800">85%</span>
                                        <span className="text-xs text-gray-500 font-medium">Complete</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 leading-relaxed">Complete your profile to unlock personalized AI recommendations.</p>
                                </div>

                                <div className="mt-2">
                                    <div className="flex justify-between text-[10px] font-semibold text-gray-500 mb-1">
                                        <span>Progress</span>
                                        <span className="text-emerald-500">Almost there!</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden p-[1px]">
                                        <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full w-[85%] shadow-sm relative overflow-hidden">
                                            <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Next Action (White Card with Rich Icon) */}
                            <div className="md:col-span-1 bg-white p-3 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-200 text-white text-xl mb-2">
                                            🎯
                                        </div>
                                        <h3 className="text-rose-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Recommended</h3>
                                        <p className="text-lg font-bold leading-tight mb-1 text-gray-600">Take Career Assessment</p>
                                        <p className="text-gray-500 text-[10px]">Discover your true potential with AI.</p>
                                    </div>
                                    <button className="mt-2 w-full bg-rose-50 text-rose-600 py-2 rounded-lg font-bold hover:bg-rose-100 transition-colors shadow-sm text-xs flex items-center justify-center gap-1.5 group-hover:shadow-md">
                                        Start Now
                                        <span className="text-base">→</span>
                                    </button>
                                </div>
                            </div>

                            {/* 4. Wishlist (Saved Colleges) */}
                            <div className="md:col-span-1 bg-white p-3 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-full -mr-5 -mt-5 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-200 text-white text-xl">
                                                🏛️
                                            </div>
                                            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition-colors cursor-pointer">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                            </div>
                                        </div>
                                        <h3 className="text-gray-600 text-[14px] font-bold uppercase tracking-widest mb-0.5">Wishlist</h3>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-2xl font-black text-gray-800">0</span>
                                            <span className="text-xs text-gray-500">Colleges</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-2">Save your dream colleges to track them here.</p>
                                </div>
                            </div>

                            {/* 5. Quick Access / Tools (White Card) */}
                            <div className="md:col-span-1 bg-white p-3 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-200 text-white text-xl mb-2">
                                            ⚡
                                        </div>
                                        <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Quick Tools</h3>
                                        <p className="text-lg font-bold mb-2 text-gray-900">Resume Builder</p>
                                    </div>
                                    <button className="w-full py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-xs font-semibold flex items-center justify-center gap-2">
                                        Create Resume
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Discovery Zone (Career Fields) */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4 px-1">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Explore Career Fields</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Discover trending industries and opportunities</p>
                                </div>
                                <button className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1 transition-colors text-xs bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100">
                                    View All Fields <span className="text-base">→</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {[
                                    { title: 'Technology & IT', icon: '💻', desc: 'Software, Data & AI', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-600' },
                                    { title: 'Medical & Health', icon: '🩺', desc: 'Doctors & Research', color: 'from-red-500 to-pink-500', bg: 'bg-red-50', text: 'text-red-600' },
                                    { title: 'Business', icon: '💼', desc: 'Management & Finance', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50', text: 'text-amber-600' },
                                    { title: 'Engineering', icon: '⚙️', desc: 'Civil & Mechanical', color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
                                    { title: 'Arts & Design', icon: '🎨', desc: 'Creative & Media', color: 'from-purple-500 to-indigo-500', bg: 'bg-purple-50', text: 'text-purple-600' },
                                    { title: 'Law', icon: '⚖️', desc: 'Legal & Policy', color: 'from-slate-600 to-slate-800', bg: 'bg-slate-50', text: 'text-slate-600' },
                                    { title: 'Science', icon: '🔬', desc: 'Research & Lab', color: 'from-teal-500 to-green-500', bg: 'bg-teal-50', text: 'text-teal-600' },
                                    { title: 'Education', icon: '📚', desc: 'Teaching & Admin', color: 'from-yellow-400 to-orange-400', bg: 'bg-yellow-50', text: 'text-yellow-600' },
                                ].map((topic, index) => (
                                    <div key={index} className="group bg-white p-4 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden">
                                        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`w-12 h-12 rounded-2xl ${topic.bg} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                                {topic.icon}
                                            </div>
                                            <div className={`w-8 h-8 rounded-full ${topic.bg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0`}>
                                                <span className={`text-lg ${topic.text}`}>↗</span>
                                            </div>
                                        </div>
                                        <h3 className="text-base font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors duration-300">{topic.title}</h3>
                                        <p className="text-[10px] text-gray-500 font-medium tracking-wide">{topic.desc}</p>
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
            case 'Settings':
                return <Settings />;
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
