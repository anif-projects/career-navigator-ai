import React from 'react';

const Settings = () => {
    const username = localStorage.getItem('username') || 'User';

    const [formData, setFormData] = React.useState({
        email: '',
        phone: '',
        location: '',
        resumeUploaded: false
    });

    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
        const savedData = localStorage.getItem('profileData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        localStorage.setItem('profileData', JSON.stringify(formData));
        setIsEditing(false);
        alert('Profile updated successfully!');
        // Trigger a custom event to notify Dashboard to update
        window.dispatchEvent(new Event('profileUpdated'));
    };

    const fileInputRef = React.useRef(null);

    const handleResumeUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Please upload a PDF or DOCX file.');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size exceeds 5MB limit.');
            return;
        }

        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('username', username);

        try {
            const response = await fetch('http://localhost:8000/upload/resume', {
                method: 'POST',
                body: formDataUpload,
            });

            if (response.ok) {
                const updatedData = { ...formData, resumeUploaded: true };
                setFormData(updatedData);
                localStorage.setItem('profileData', JSON.stringify(updatedData));
                alert('Resume uploaded successfully!');
                window.dispatchEvent(new Event('profileUpdated'));
            } else {
                const errorData = await response.json();
                alert(`Upload failed: ${errorData.detail}`);
            }
        } catch (error) {
            console.error('Error uploading resume:', error);
            alert('Failed to upload resume.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

            <div className="space-y-6">
                {/* Personal Information Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">
                                👤
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
                                <p className="text-xs text-gray-500">Manage your personal details</p>
                            </div>
                        </div>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm ${isEditing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Details'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                            <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm opacity-70 cursor-not-allowed">
                                {username}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full p-3 bg-white rounded-lg border border-gray-200 text-gray-800 font-medium text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                />
                            ) : (
                                <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm min-h-[46px]">
                                    {formData.email || <span className="text-gray-400 italic">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full p-3 bg-white rounded-lg border border-gray-200 text-gray-800 font-medium text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                />
                            ) : (
                                <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm min-h-[46px]">
                                    {formData.phone || <span className="text-gray-400 italic">Not set</span>}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Location</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter location"
                                    className="w-full p-3 bg-white rounded-lg border border-gray-200 text-gray-800 font-medium text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                />
                            ) : (
                                <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm min-h-[46px]">
                                    {formData.location || <span className="text-gray-400 italic">Not set</span>}
                                </div>
                            )}
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
                        <div className="flex gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                accept=".pdf,.docx"
                            />
                            <button
                                onClick={handleResumeUpload}
                                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
                            >
                                <span>{formData.resumeUploaded ? 'Update Resume' : 'Upload New'}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            </button>
                        </div>
                    </div>

                    {formData.resumeUploaded ? (
                        <div className="border-2 border-green-100 bg-green-50/50 rounded-xl p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-2xl text-green-500">
                                    ✅
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-800">Resume Uploaded</h3>
                                    <p className="text-xs text-gray-500">Your resume is saved and ready for analysis.</p>
                                </div>
                            </div>
                            <button onClick={() => {
                                const newData = { ...formData, resumeUploaded: false };
                                setFormData(newData);
                                localStorage.setItem('profileData', JSON.stringify(newData));
                                window.dispatchEvent(new Event('profileUpdated'));
                            }} className="text-red-500 text-xs font-bold hover:underline">
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-300 transition-colors bg-gray-50/50">
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-3xl">
                                📄
                            </div>
                            <h3 className="text-sm font-bold text-gray-800 mb-1">No resume uploaded</h3>
                            <p className="text-xs text-gray-500 max-w-xs mb-4">Upload your resume to get personalized career recommendations based on your skills and experience.</p>
                            <button onClick={handleResumeUpload} className="text-blue-600 text-xs font-bold hover:underline">
                                Browse Files
                            </button>
                        </div>
                    )}
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
