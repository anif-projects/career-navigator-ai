import React from 'react';

const Settings = () => {
    const username = localStorage.getItem('username') || 'User';
    const email = 'user@example.com'; // Placeholder, replace with actual data if available

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

            <div className="space-y-6">
                {/* Personal Information Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">
                            👤
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
                            <p className="text-xs text-gray-500">Manage your personal details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                            <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm">
                                {username}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                            <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm">
                                {email}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                            <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm">
                                +1 (555) 123-4567
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Location</label>
                            <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm">
                                New York, USA
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resume Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl">
                                📄
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Resume</h2>
                                <p className="text-xs text-gray-500">Manage your resume and professional documents</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
                            <span>Upload New</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        </button>
                    </div>

                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-300 transition-colors bg-gray-50/50">
                        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-3xl">
                            📄
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 mb-1">No resume uploaded</h3>
                        <p className="text-xs text-gray-500 max-w-xs mb-4">Upload your resume to get personalized career recommendations based on your skills and experience.</p>
                        <button className="text-blue-600 text-xs font-bold hover:underline">
                            Browse Files
                        </button>
                    </div>
                </div>

                {/* Account Settings Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 text-xl">
                            ⚙️
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Account Preferences</h2>
                            <p className="text-xs text-gray-500">Manage your account settings</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                                    🔔
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800">Notifications</h3>
                                    <p className="text-[10px] text-gray-500">Manage email and push notifications</p>
                                </div>
                            </div>
                            <span className="text-gray-400">→</span>
                        </div>

                        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                                    🔒
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800">Privacy & Security</h3>
                                    <p className="text-[10px] text-gray-500">Manage password and security settings</p>
                                </div>
                            </div>
                            <span className="text-gray-400">→</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
